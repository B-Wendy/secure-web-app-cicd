package com.example.emergencyapp

import android.telephony.SmsManager

object SmsHelper {
    fun sendSMS(phoneNumber: String, message: String) {
        val smsManager = SmsManager.getDefault()
        smsManager.sendTextMessage(phoneNumber, null, message, null, null)
    }
}