package com.example.emergencyapp

import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class SettingsActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_placeholder)

        findViewById<TextView>(R.id.placeholderTitle).text = "Settings"
        findViewById<TextView>(R.id.placeholderDesc).text = "Configure app preferences and permissions."
        findViewById<Button>(R.id.btnBack).setOnClickListener { finish() }
    }
}