package com.example.blog

import android.content.Intent
import android.os.Bundle
import android.text.TextUtils
import java.util.regex.Pattern
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class Register_Activity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)

        findViewById<Button>(R.id.btn_register).setOnClickListener{
            val email = findViewById<EditText>(R.id.r_email)
            val name = findViewById<EditText>(R.id.r_name)
            val password = findViewById<EditText>(R.id.r_password)
            registerUser(name.text.toString(), email.text.toString(), password.text.toString())
        }
    }

    private fun registerUser(name: String, email : String, password : String){
        if (!isValidEmail(email))
        {
            Toast.makeText(this@Register_Activity, "Not right Email", Toast.LENGTH_SHORT).show()
            return;
        }
        if (TextUtils.isEmpty(password))
        {
            Toast.makeText(this@Register_Activity, "Password can't be empty", Toast.LENGTH_SHORT).show()
            return;
        }
        if (TextUtils.isEmpty(name))
        {
            Toast.makeText(this@Register_Activity, "Name can't be empty", Toast.LENGTH_SHORT).show()
            return;
        }
        Toast.makeText(this@Register_Activity, "Successfully register", Toast.LENGTH_SHORT).show()
        startActivity(Intent(this@Register_Activity, MainActivity::class.java))
    }

    val EMAIL_ADDRESS_PATTERN = Pattern.compile(
        "[a-zA-Z0-9\\+\\.\\_\\%\\-\\+]{1,256}" +
                "\\@" +
                "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}" +
                "(" +
                "\\." +
                "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25}" +
                ")+"
    )

    fun isValidEmail(email: String): Boolean{
        return !TextUtils.isEmpty(email) && EMAIL_ADDRESS_PATTERN.matcher(email).matches()
    }
}