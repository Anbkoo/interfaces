package com.example.blog

import android.os.Bundle
import android.text.TextUtils
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import com.example.blog.retrofit.Service
import android.widget.EditText
import android.widget.Toast
import io.reactivex.disposables.CompositeDisposable
import java.util.regex.Pattern
import android.content.Intent

class MainActivity : AppCompatActivity() {
    lateinit var MyService:Service
    internal var compositeDisposable = CompositeDisposable()

    override fun onStop(){
        compositeDisposable.clear()
        super.onStop()
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

//        val retrofit = RetrofitClient.getInstance()
//        MyService = retrofit.create(MyService::class.java)

        findViewById<Button>(R.id.but_log_in).setOnClickListener{
            val email = findViewById<EditText>(R.id.email)
            val password = findViewById<EditText>(R.id.password)
            loginUser(email.text.toString(), password.text.toString())
        }

        findViewById<Button>(R.id.register).setOnClickListener{
            startActivity(Intent(this@MainActivity, Register_Activity::class.java))
        }

    }

    private fun loginUser(email : String, password : String){
        if (!isValidEmail(email))
        {
            Toast.makeText(this@MainActivity, "Not Right Email", Toast.LENGTH_SHORT).show()
            return;
        }
        if (TextUtils.isEmpty(password))
        {
            Toast.makeText(this@MainActivity, "Password can't be empty", Toast.LENGTH_SHORT).show()
            return;
        }
//        compositeDisposable.add(MyService.login_user(email, password)
//            .subscribeOn(Schedulers.io())
//            .observeOn(AndroidSchedulers.mainThread())
//            .subscribe {
//                    result -> Toast.makeText(this@MainActivity, ""+result, Toast.LENGTH_SHORT).show()
//            })

        startActivity(Intent(this@MainActivity, BlogActivity::class.java))
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