package com.weather;

import java.util.Map;
import java.util.HashMap;

import android.app.Activity;
import android.content.Intent;
import androidx.annotation.NonNull;
import android.util.Log;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableArray;
import com.google.android.gms.wallet.IsReadyToPayRequest;
import com.google.android.gms.wallet.PaymentDataRequest;
import com.google.android.gms.wallet.PaymentData;
import com.google.android.gms.wallet.AutoResolveHelper;
import com.google.android.gms.wallet.PaymentsClient;
import com.google.android.gms.wallet.Wallet;
import com.google.android.gms.wallet.WalletConstants;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.common.api.Status;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class GooglePayModule extends ReactContextBaseJavaModule {
    private static final String EXPORT_NAME = "GooglePayModule";

    private static final int LOAD_PAYMENT_DATA_REQUEST_CODE = 42;
    private static final String E_NO_PAYMENT_REQUEST_JSON = "E_NO_PAYMENT_REQUEST_JSON";
    private static final String E_NO_PAYMENT_REQUEST = "E_NO_PAYMENT_REQUEST";
    private static final String E_NO_ACTIVITY = "E_NO_ACTIVITY";
    private static final String E_PAYMENT_DATA = "E_PAYMENT_DATA";
    private static final String PAYMENT_CANCELLED = "PAYMENT_CANCELLED";
    private static final String E_AUTO_RESOLVE_FAILED = "E_AUTO_RESOLVE_FAILED";
    private static final String NOT_READY_TO_PAY = "NOT_READY_TO_PAY";
    private static final String E_FAILED_TO_DETECT_IF_READY = "E_FAILED_TO_DETECT_IF_READY";
    private static final String ENVIRONMENT_PRODUCTION_KEY = "ENVIRONMENT_PRODUCTION";
    private static final String ENVIRONMENT_TEST_KEY = "ENVIRONMENT_TEST";

    private static JSONObject getBaseRequest() throws JSONException {
        return new JSONObject()
                .put("apiVersion", 2)
                .put("apiVersionMinor", 0);
    }

    private static JSONObject getTokenizationSpecification(ReadableMap gateway) throws JSONException {
        JSONObject tokenizationSpecification = new JSONObject();
        tokenizationSpecification.put("type", "PAYMENT_GATEWAY");
        switch (gateway.getString("name").toLowerCase()) {
            case "braintree": {
                tokenizationSpecification.put(
                        "parameters",
                        new JSONObject()
                                .put("gateway", "braintree")
                                .put("braintree:apiVersion", "v1")
                                .put("braintree:sdkVersion", gateway.getString("sdkVersion"))
                                .put("braintree:merchantId", gateway.getString("merchantId"))
                                .put("braintree:clientKey", gateway.getString("clientKey")));

                break;
            }
            case "stripe": {
                tokenizationSpecification.put(
                        "parameters",
                        new JSONObject()
                                .put("gateway", "stripe")
                                .put("stripe:sdkVersion", gateway.getString("sdkVersion"))
                                .put("stripe:publishableKey", gateway.getString("clientKey")));

                break;
            }
            default: {
                tokenizationSpecification.put(
                        "parameters",
                        new JSONObject()
                                .put("gateway", gateway.getString("name"))
                                .put("gatewayMerchantId", gateway.getString("merchantId")));

                break;
            }
        }
        return tokenizationSpecification;
    }

    private static JSONArray getAllowedCardNetworks(ReadableArray cardNetworks) {

        JSONArray jsonArray = new JSONArray();

        for (Object value : cardNetworks.toArrayList()) {
            jsonArray.put(value.toString());
        }

        return jsonArray;
    }

    private static JSONArray getAllowedCardAuthMethods() {
        return new JSONArray()
                .put("PAN_ONLY")
                .put("CRYPTOGRAM_3DS");
    }

    private static JSONObject getBaseCardPaymentMethod(ReadableArray cardNetworks) throws JSONException {
        JSONObject cardPaymentMethod = new JSONObject();
        cardPaymentMethod.put("type", "CARD");
        cardPaymentMethod.put(
                "parameters",
                new JSONObject()
                        .put("allowedAuthMethods", GooglePayModule.getAllowedCardAuthMethods())
                        .put("allowedCardNetworks", GooglePayModule.getAllowedCardNetworks(cardNetworks)));

        return cardPaymentMethod;
    }

    private static JSONObject getCardPaymentMethod(ReadableMap cardPaymentMethodMap) throws JSONException {
        JSONObject cardPaymentMethod = GooglePayModule.getBaseCardPaymentMethod(cardPaymentMethodMap.getArray("cardNetworks"));
        cardPaymentMethod.put("tokenizationSpecification", GooglePayModule.getTokenizationSpecification(cardPaymentMethodMap.getMap("gateway")));

        return cardPaymentMethod;
    }

    private static JSONObject getTransactionInfo(ReadableMap transaction) throws JSONException {
        JSONObject transactionInfo = new JSONObject();
        transactionInfo.put("totalPrice", transaction.getString("totalPrice"));
        transactionInfo.put("totalPriceStatus", transaction.getString("totalPriceStatus"));
        transactionInfo.put("currencyCode", transaction.getString("currencyCode"));

        return transactionInfo;
    }

    private static JSONObject getMerchantInfo(String merchantName) throws JSONException {
        return new JSONObject()
                .put("merchantName", merchantName);
    }

    private static JSONObject getIsReadyToPayRequest(ReadableArray cardNetworks) {
        try {
            JSONObject isReadyToPayRequest = GooglePayModule.getBaseRequest();
            isReadyToPayRequest.put(
                    "allowedPaymentMethods", new JSONArray().put(getBaseCardPaymentMethod(cardNetworks)));
            return isReadyToPayRequest;
        } catch (JSONException e) {
            Log.e("getIsReadyToPayRequest", e.toString());
            return null;
        }
    }

    private static JSONObject getPaymentDataRequest(ReadableMap requestData) {
        try {
            JSONObject paymentDataRequest = GooglePayModule.getBaseRequest();
            paymentDataRequest.put(
                    "allowedPaymentMethods", new JSONArray().put(GooglePayModule.getCardPaymentMethod(requestData.getMap("cardPaymentMethodMap"))));
            paymentDataRequest.put("transactionInfo", GooglePayModule.getTransactionInfo(requestData.getMap("transaction")));
            paymentDataRequest.put("merchantInfo", GooglePayModule.getMerchantInfo(requestData.getString("merchantName")));
            return paymentDataRequest;
        } catch (JSONException e) {
            Log.e("getPaymentDataRequest", e.toString());
            return null;
        }
    }

    private PaymentsClient mPaymentsClient = null;

    private Promise mRequestPaymentPromise = null;

    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
            switch (requestCode) {
                case LOAD_PAYMENT_DATA_REQUEST_CODE:
                    switch (resultCode) {
                        case Activity.RESULT_OK:
                            PaymentData paymentData = PaymentData.getFromIntent(data);
                            if (paymentData == null) {
                                mRequestPaymentPromise.reject(E_PAYMENT_DATA, "payment data is null");
                            } else {
                                String json = paymentData.toJson();
                                if (json != null) {
                                    JSONObject paymentDataJson = null;
                                    try {
                                        paymentDataJson = new JSONObject(json);
                                    } catch (JSONException e) {
                                        mRequestPaymentPromise.reject(E_PAYMENT_DATA, e.getMessage());
                                    }
                                    if (paymentDataJson == null) return;
                                    try {
                                        JSONObject paymentMethodData =
                                                paymentDataJson.getJSONObject("paymentMethodData");
                                        String token = paymentMethodData
                                                .getJSONObject("tokenizationData").getString("token");
                                        Log.v("Token : ", token);
                                        Log.v("Response", paymentMethodData.toString());
                                        mRequestPaymentPromise.resolve(token);
                                    } catch (JSONException e) {
                                        mRequestPaymentPromise.reject(E_PAYMENT_DATA, e.getMessage());
                                    }

                                } else {
                                    mRequestPaymentPromise.reject(E_AUTO_RESOLVE_FAILED, "method is null");
                                }
                            }
                            break;
                        case Activity.RESULT_CANCELED:
                            mRequestPaymentPromise.reject(PAYMENT_CANCELLED, "payment has been canceled");

                            break;
                        case AutoResolveHelper.RESULT_ERROR:
                            Status status = AutoResolveHelper.getStatusFromIntent(data);
                            mRequestPaymentPromise.reject(E_AUTO_RESOLVE_FAILED, "auto resolve has been failed. status: " + status.getStatusMessage());
                            break;
                        default:
                            // Do nothing.
                    }
                    break;
                default:
                    // Do nothing.
                }

                mRequestPaymentPromise = null;
            }
        };

    public GooglePayModule(ReactApplicationContext context) {
        super(context);
        context.addActivityEventListener(mActivityEventListener);
    }

    @Override
    public String getName() {
        return EXPORT_NAME;
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(ENVIRONMENT_PRODUCTION_KEY, WalletConstants.ENVIRONMENT_PRODUCTION);
        constants.put(ENVIRONMENT_TEST_KEY, WalletConstants.ENVIRONMENT_TEST);
        return constants;
    }

    @ReactMethod
    public void checkGooglePayIsEnable(int environment, ReadableArray cardNetworks, final Promise promise) {
        final JSONObject isReadyToPayJson = GooglePayModule.getIsReadyToPayRequest(cardNetworks);
        if (isReadyToPayJson == null) {
            promise.reject(NOT_READY_TO_PAY, "not ready to pay");
        }
        IsReadyToPayRequest request = IsReadyToPayRequest.fromJson(isReadyToPayJson.toString());
        if (request == null) {
            promise.reject(NOT_READY_TO_PAY, "not ready to pay");
        }

        Activity activity = getCurrentActivity();

        if (activity == null) {
            promise.reject(E_NO_ACTIVITY, "activity is null");
        }

        Task<Boolean> task = getPaymentsClient(environment, activity).isReadyToPay(request);
        task.addOnCompleteListener(
                new OnCompleteListener<Boolean>() {
                    @Override
                    public void onComplete(@NonNull Task<Boolean> task) {
                        try {
                            boolean result = task.getResult(ApiException.class);
                            if (result) {
                                promise.resolve(result);
                            } else {
                                promise.reject(NOT_READY_TO_PAY, "not ready to pay");
                            }
                        } catch (ApiException exception) {
                            promise.reject(E_FAILED_TO_DETECT_IF_READY, exception.getMessage());
                        }
                    }
                }
        );
    }


    @ReactMethod
    public void show(int environment, ReadableMap requestData, final Promise promise) {
        Activity activity = getCurrentActivity();

        if (activity == null) {
            promise.reject(E_NO_ACTIVITY, "activity is null");
            return;
        }

        this.mRequestPaymentPromise = promise;

        JSONObject paymentDataRequestJson = GooglePayModule.getPaymentDataRequest(requestData);
        if (paymentDataRequestJson == null) {
            promise.reject(E_NO_PAYMENT_REQUEST_JSON, "payment data request json is null");
            return;
        }
        PaymentDataRequest request =
                PaymentDataRequest.fromJson(paymentDataRequestJson.toString());
        if (request != null) {
            AutoResolveHelper.resolveTask(
                    getPaymentsClient(environment, activity).loadPaymentData(request), activity, LOAD_PAYMENT_DATA_REQUEST_CODE);
        } else {
            promise.reject(E_NO_PAYMENT_REQUEST, "payment data request is null");
        }
    }

    private PaymentsClient getPaymentsClient(int environment, @NonNull Activity activity) {
        if (mPaymentsClient == null) {
            mPaymentsClient =
                    Wallet.getPaymentsClient(
                            activity,
                            new Wallet.WalletOptions.Builder()
                                    .setEnvironment(environment)
                                    .build());
        }
        return mPaymentsClient;
    }
}