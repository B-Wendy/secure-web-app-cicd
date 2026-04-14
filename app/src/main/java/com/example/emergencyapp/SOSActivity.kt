package com.example.emergencyapp

import android.Manifest
import android.content.pm.PackageManager
import android.location.Location
import android.os.Bundle
import android.telephony.SmsManager
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices

class SOSActivity : AppCompatActivity() {

    private lateinit var fusedLocationClient: FusedLocationProviderClient
    private lateinit var sosButton: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_sos)

        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)
        sosButton = findViewById(R.id.btnSendSOS)

        sosButton.setOnClickListener {
            sendSOS()
        }
    }

    private fun sendSOS() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.SEND_SMS)
            != PackageManager.PERMISSION_GRANTED ||
            ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
            != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(
                this,
                arrayOf(Manifest.permission.SEND_SMS, Manifest.permission.ACCESS_FINE_LOCATION),
                100
            )
            return
        }

        fusedLocationClient.lastLocation.addOnSuccessListener { location: Location? ->
            location?.let {
                val message = "Emergency! I need help. My location: " +
                        "https://maps.google.com/?q=${it.latitude},${it.longitude}"
                val smsManager = SmsManager.getDefault()
                val contacts = listOf("+237XXXXXXXXX", "+237YYYYYYYYY") // replace with your contacts
                contacts.forEach { number ->
                    smsManager.sendTextMessage(number, null, message, null, null)
                }
                Toast.makeText(this, "SOS sent!", Toast.LENGTH_SHORT).show()
            } ?: run {
                Toast.makeText(this, "Unable to fetch location", Toast.LENGTH_SHORT).show()
            }
        }
    }
}