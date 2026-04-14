package com.example.emergencyapp

import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class AlertActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_placeholder)

        findViewById<TextView>(R.id.placeholderTitle).text = "Safety Alerts"
        findViewById<TextView>(R.id.placeholderDesc).text = "View recent safety alerts in your area."
        findViewById<Button>(R.id.btnBack).setOnClickListener { finish() }
    }
}