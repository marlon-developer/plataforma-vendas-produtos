(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-5473"],{"+sux":function(t,a,e){"use strict";e.r(a);var n=e("Yfch"),o={name:"ForgotPass",data:function(){return{formData:{email:""},loading:!1}},mounted:function(){var t=this.$route.query.token;t&&this.$router.push({name:"ResetPassword",query:{token:t}})},methods:{handleReset:function(){var t=this;Object(n.a)(this.formData.email)?(this.loading=!0,this.$store.dispatch("ForgotPassword",this.formData).then(function(){t.loading=!1,t.$message({message:"Sucesso! Enviamos um e-mail para "+t.formData.email+", verifique sua caixa de entrada!",type:"success",duration:3e4}),t.$router.push("/login")}).catch(function(){t.$message({message:"Ops! houve um erro ao enviar o e-mail para "+t.formData.email+", Tente novamente mais tarde!",type:"error",duration:3e4}),t.loading=!1})):this.$message({message:"E-mail Inválido!",type:"error",duration:1e4})},handleLogin:function(){var t=this;this.loading=!0,setTimeout(function(){t.$router.push({path:"/login"}),t.loading=!1},100)}}},i=(e("HX9m"),e("AGLQ"),e("KHd+")),s=Object(i.a)(o,function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"login-container"},[e("el-form",{ref:"resetForm",staticClass:"login-form",attrs:{autocomplete:"on"},model:{value:t.formData,callback:function(a){t.formData=a},expression:"formData"}},[e("div",{staticClass:"title-container"},[e("h3",{staticClass:"title"},[t._v("E-commerce Admin")])]),t._v(" "),e("el-form-item",{attrs:{prop:"email"}},[e("span",{staticClass:"svg-container"},[e("svg-icon",{attrs:{"icon-class":"email"}})],1),t._v(" "),e("el-input",{attrs:{placeholder:"E-mail"},model:{value:t.formData.email,callback:function(a){t.$set(t.formData,"email",a)},expression:"formData.email"}})],1),t._v(" "),e("el-button",{staticStyle:{width:"100%","margin-bottom":"10px"},attrs:{loading:t.loading,type:"primary"},nativeOn:{click:function(a){return a.preventDefault(),t.handleReset(a)}}},[t._v("Enviar")]),t._v(" "),e("el-button",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:t.loading,expression:"loading",modifiers:{fullscreen:!0,lock:!0}}],staticStyle:{float:"right"},attrs:{type:"text"},on:{click:t.handleLogin}},[t._v("Voltar para o Login")])],1)],1)},[],!1,null,"5c24359d",null);s.options.__file="forgot.vue";a.default=s.exports},AGLQ:function(t,a,e){"use strict";var n=e("FsM8");e.n(n).a},FsM8:function(t,a,e){},HX9m:function(t,a,e){"use strict";var n=e("jcyS");e.n(n).a},Yfch:function(t,a,e){"use strict";function n(t){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(t)}e.d(a,"a",function(){return n})},jcyS:function(t,a,e){}}]);