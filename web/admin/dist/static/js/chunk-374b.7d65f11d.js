(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-374b"],{Yfch:function(e,t,n){"use strict";function o(e){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)}n.d(t,"a",function(){return o})},c11S:function(e,t,n){"use strict";var o=n("gTgX");n.n(o).a},d4m3:function(e,t,n){},gTgX:function(e,t,n){},ntYl:function(e,t,n){"use strict";n.r(t);var o=n("Yfch"),s={name:"Login",data:function(){return{loginForm:{username:"",password:""},loginRules:{username:[{required:!0,trigger:"blur",validator:function(e,t,n){Object(o.a)(t)?n():n(new Error("Please enter the correct user name"))}}],password:[{required:!0,trigger:"blur",validator:function(e,t,n){t.length<6?n(new Error("The password can not be less than 6 digits")):n()}}]},passwordType:"password",loading:!1,showDialog:!1,redirect:void 0,myEnv:Object({NODE_ENV:"production",ENV_CONFIG:"production",BASE_API:"https://api.adonisjs.com.br/v1",WS_ENDPOINT:"wss://api.adonisjs.com.br"})}},watch:{$route:{handler:function(e){this.redirect=e.query&&e.query.redirect},immediate:!0}},methods:{showPwd:function(){"password"===this.passwordType?this.passwordType="":this.passwordType="password"},handleLogin:function(){var e=this;this.$refs.loginForm.validate(function(t){if(!t)return console.log("error submit!!"),!1;e.loading=!0,e.$store.dispatch("LoginByUsername",e.loginForm).then(function(){e.loading=!1,e.$router.push({path:e.redirect||"/"})}).catch(function(){e.loading=!1})})},handleReset:function(){this.$router.push({name:"ForgotPassword"})}}},r=(n("c11S"),n("oWns"),n("KHd+")),a=Object(r.a)(s,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"login-container"},[n("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:e.loginForm,rules:e.loginRules,"auto-complete":"on","label-position":"left"}},[n("div",{staticClass:"title-container"},[n("h3",{staticClass:"title"},[e._v("E-commerce Admin")])]),e._v(" "),n("el-form-item",{attrs:{prop:"username"}},[n("span",{staticClass:"svg-container"},[n("svg-icon",{attrs:{"icon-class":"email"}})],1),e._v(" "),n("el-input",{attrs:{placeholder:"email",name:"username",type:"text","auto-complete":"on"},model:{value:e.loginForm.username,callback:function(t){e.$set(e.loginForm,"username",t)},expression:"loginForm.username"}})],1),e._v(" "),n("el-form-item",{attrs:{prop:"password"}},[n("span",{staticClass:"svg-container"},[n("svg-icon",{attrs:{"icon-class":"password"}})],1),e._v(" "),n("el-input",{attrs:{type:e.passwordType,placeholder:"senha",name:"password","auto-complete":"on"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleLogin(t):null}},model:{value:e.loginForm.password,callback:function(t){e.$set(e.loginForm,"password",t)},expression:"loginForm.password"}}),e._v(" "),n("span",{staticClass:"show-pwd",on:{click:e.showPwd}},[n("svg-icon",{attrs:{"icon-class":"password"===e.passwordType?"eye":"eye-open"}})],1)],1),e._v(" "),n("el-button",{staticStyle:{width:"100%","margin-bottom":"10px"},attrs:{loading:e.loading,type:"primary"},nativeOn:{click:function(t){return t.preventDefault(),e.handleLogin(t)}}},[e._v("Entrar")]),e._v(" "),n("el-button",{staticStyle:{float:"right"},attrs:{type:"text"},on:{click:e.handleReset}},[e._v("Esqueceu sua senha?")])],1),e._v(" "),n("p",[e._v(e._s(e.myEnv.NODE_ENV))])],1)},[],!1,null,"0bea7260",null);a.options.__file="index.vue";t.default=a.exports},oWns:function(e,t,n){"use strict";var o=n("d4m3");n.n(o).a}}]);