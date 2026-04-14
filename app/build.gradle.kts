plugins {
    alias(libs.plugins.android.application)
}

android {
    namespace = "com.example.emergencyapp"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.example.emergencyapp"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }

    buildFeatures {
        viewBinding = true
    }
}

dependencies {
    // Core Android + Kotlin
    implementation("androidx.core:core-ktx:1.12.0")
    implementation("androidx.appcompat:appcompat:1.6.1")
    implementation("com.google.android.material:material:1.11.0")
    implementation("androidx.constraintlayout:constraintlayout:2.1.4")

    // Location services
    implementation("com.google.android.gms:play-services-location:21.0.1")

    // Lifecycle + Coroutines
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.7.0")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.3")

    // RecyclerView
    implementation("androidx.recyclerview:recyclerview:1.3.2")

    // Room
    implementation("androidx.room:room-runtime:2.6.1")
}
