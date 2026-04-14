package com.example.emergencyapp

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.location.Location
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.os.VibrationEffect
import android.os.Vibrator
import android.view.MotionEvent
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices

class MainActivity : AppCompatActivity() {

    // Views
    private lateinit var sosButton: Button
    private lateinit var locationText: TextView
    private lateinit var refreshLocation: TextView
    private lateinit var statusText: TextView

    // Feature cards
    private lateinit var btnContacts: LinearLayout
    private lateinit var btnReport: LinearLayout
    private lateinit var btnNearby: LinearLayout
    private lateinit var btnAlert: LinearLayout
    private lateinit var btnSettings: LinearLayout

    // Location
    private lateinit var fusedLocationClient: FusedLocationProviderClient
    private var currentLocation: Location? = null

    // SOS hold handler
    private val sosHoldDuration = 2000L
    private var sosHandler: Handler? = null
    private var sosRunnable: Runnable? = null
    private var isSosHolding = false

    companion object {
        private const val PERMISSIONS_REQUEST_CODE = 1001
        val REQUIRED_PERMISSIONS = arrayOf(
            Manifest.permission.SEND_SMS,
            Manifest.permission.ACCESS_FINE_LOCATION,
            Manifest.permission.ACCESS_COARSE_LOCATION,
            Manifest.permission.CAMERA,
            Manifest.permission.RECORD_AUDIO,
            Manifest.permission.CALL_PHONE
        )
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        initViews()
        setupClickListeners()
        requestPermissionsIfNeeded()

        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)
        fetchLocation()
    }

    private fun initViews() {
        sosButton = findViewById(R.id.sosButton)
        locationText = findViewById(R.id.locationText)
        refreshLocation = findViewById(R.id.refreshLocation)
        statusText = findViewById(R.id.statusText)
        btnContacts = findViewById(R.id.btnContacts)
        btnReport = findViewById(R.id.btnReport)
        btnNearby = findViewById(R.id.btnNearby)
        btnAlert = findViewById(R.id.btnAlert)
        btnSettings = findViewById(R.id.btnSettings)
    }

    private fun setupClickListeners() {

        // SOS button — hold to activate
        sosButton.setOnTouchListener { _, event ->
            when (event.action) {
                MotionEvent.ACTION_DOWN -> {
                    isSosHolding = true
                    sosButton.alpha = 0.7f
                    sosButton.text = "HOLD..."
                    vibrateShort()

                    sosHandler = Handler(Looper.getMainLooper())
                    sosRunnable = Runnable {
                        if (isSosHolding) {
                            activateSOS()
                        }
                    }
                    sosHandler?.postDelayed(sosRunnable!!, sosHoldDuration)
                    true
                }
                MotionEvent.ACTION_UP, MotionEvent.ACTION_CANCEL -> {
                    isSosHolding = false
                    sosButton.alpha = 1.0f
                    sosButton.text = "SOS"
                    sosHandler?.removeCallbacks(sosRunnable!!)
                    true
                }
                else -> false
            }
        }

        refreshLocation.setOnClickListener {
            locationText.text = "Locating..."
            fetchLocation()
        }

        btnContacts.setOnClickListener {
            startActivity(Intent(this, ContactsActivity::class.java))
        }

        btnReport.setOnClickListener {
            startActivity(Intent(this, ReportActivity::class.java))
        }

        btnNearby.setOnClickListener {
            startActivity(Intent(this, NearbyActivity::class.java))
        }

        btnAlert.setOnClickListener {
            startActivity(Intent(this, AlertActivity::class.java))
        }

        btnSettings.setOnClickListener {
            startActivity(Intent(this, SettingsActivity::class.java))
        }
    }

    private fun activateSOS() {
        vibrateStrong()
        val intent = Intent(this, SOSActivity::class.java).apply {
            currentLocation?.let {
                putExtra("latitude", it.latitude)
                putExtra("longitude", it.longitude)
            }
        }
        startActivity(intent)
        sosButton.text = "SOS"
        sosButton.alpha = 1.0f
    }

    private fun fetchLocation() {
        if (ContextCompat.checkSelfPermission(
                this, Manifest.permission.ACCESS_FINE_LOCATION
            ) == PackageManager.PERMISSION_GRANTED
        ) {
            fusedLocationClient.lastLocation.addOnSuccessListener { location ->
                if (location != null) {
                    currentLocation = location
                    locationText.text = "%.4f, %.4f".format(location.latitude, location.longitude)
                } else {
                    locationText.text = "Unable to get location"
                }
            }.addOnFailureListener {
                locationText.text = "Location error"
            }
        } else {
            locationText.text = "Location permission needed"
        }
    }

    private fun requestPermissionsIfNeeded() {
        val missing = REQUIRED_PERMISSIONS.filter {
            ContextCompat.checkSelfPermission(this, it) != PackageManager.PERMISSION_GRANTED
        }
        if (missing.isNotEmpty()) {
            ActivityCompat.requestPermissions(
                this,
                missing.toTypedArray(),
                PERMISSIONS_REQUEST_CODE
            )
        }
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == PERMISSIONS_REQUEST_CODE) {
            val allGranted = grantResults.all { it == PackageManager.PERMISSION_GRANTED }
            if (allGranted) {
                fetchLocation()
                Toast.makeText(this, "All permissions granted", Toast.LENGTH_SHORT).show()
            } else {
                Toast.makeText(
                    this,
                    "Some permissions denied — app may not work fully",
                    Toast.LENGTH_LONG
                ).show()
            }
        }
    }

    @Suppress("DEPRECATION")
    private fun vibrateShort() {
        val vibrator = getSystemService(VIBRATOR_SERVICE) as Vibrator
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            vibrator.vibrate(VibrationEffect.createOneShot(100, VibrationEffect.DEFAULT_AMPLITUDE))
        } else {
            vibrator.vibrate(100)
        }
    }

    @Suppress("DEPRECATION")
    private fun vibrateStrong() {
        val vibrator = getSystemService(VIBRATOR_SERVICE) as Vibrator
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            vibrator.vibrate(VibrationEffect.createWaveform(longArrayOf(0, 300, 100, 300), -1))
        } else {
            vibrator.vibrate(longArrayOf(0, 300, 100, 300), -1)
        }
    }

    override fun onResume() {
        super.onResume()
        fetchLocation()
    }
}