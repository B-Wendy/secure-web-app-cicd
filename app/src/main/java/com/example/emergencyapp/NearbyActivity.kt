package com.example.emergencyapp

import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class NearbyActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_placeholder)

        findViewById<TextView>(R.id.placeholderTitle).text = "Nearby Help"
        findViewById<TextView>(R.id.placeholderDesc).text = "Find police stations and hospitals nearby."
        findViewById<Button>(R.id.btnBack).setOnClickListener { finish() }
    }
}