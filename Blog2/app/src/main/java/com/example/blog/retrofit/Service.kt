package com.example.blog.retrofit

import android.provider.ContactsContract
import retrofit2.http.Field
import retrofit2.http.FormUrlEncoded
import retrofit2.http.POST
import io.reactivex.Observable

interface Service {
    @POST("register")
    @FormUrlEncoded
    fun register_user(@Field("name") name: String,
                      @Field("email") email: String,
                      @Field("password") password: String
    ) : Observable<String>

    @POST("login")
    @FormUrlEncoded
    fun login_user(@Field("email") email: String,
                   @Field("password") password: String
    ) : Observable<String>
}