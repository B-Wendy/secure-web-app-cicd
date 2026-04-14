package com.example.emergencyapp

import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class ReportActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_placeholder)

        findViewById<TextView>(R.id.placeholderTitle).text = "Report Incident"
        findViewById<TextView>(R.id.placeholderDesc).text = "Submit a report about a safety incident."
        findViewById<Button>(R.id.btnBack).setOnClickListener { finish() }
    }
}