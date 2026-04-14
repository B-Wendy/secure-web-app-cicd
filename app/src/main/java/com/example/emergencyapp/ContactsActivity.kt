package com.example.emergencyapp

import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class ContactsActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_placeholder)

        findViewById<TextView>(R.id.placeholderTitle).text = "Emergency Contacts"
        findViewById<TextView>(R.id.placeholderDesc).text = "Manage your emergency contacts here."
        findViewById<Button>(R.id.btnBack).setOnClickListener { finish() }
    }
}