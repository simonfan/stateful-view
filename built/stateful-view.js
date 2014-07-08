//     stateful-view
//     (c) simonfan
//     stateful-view is licensed under the MIT terms.

define("__stateful-view/build-stateful-method",["require","exports","module","lodash","q"],function(t,e,i){var s=t("lodash"),a=t("q");i.exports=function(t,e){var i=t+":doing",n=t+":done";return function(){var h=this.getState();if(h===n||h===i)return this.cache(t);this.setState(i);var o=e.apply(this,arguments);return this.cache(t,o),a.isPromise(o)?o.done(s.partial(this.setState,n)):this.setState(n),o}}}),define("stateful-view",["require","exports","module","lowercase-backbone","lodash","improved-model","./__stateful-view/build-stateful-method"],function(t,e,i){var s=t("lowercase-backbone"),a=t("lodash"),n=t("improved-model"),h=t("./__stateful-view/build-stateful-method"),o=i.exports=s.view.extend({initialize:function(t){s.view.prototype.initialize.apply(this,arguments),this.initializeStatefulView(t)},initializeStatefulView:function(t){t=t||{},this._cache={},a.bindAll(this,["setState","getState"]),this.control=t.control||n();var e=t.cases||this.cases;a.isArray(e)?a.each(e,function(t){this.when(t.condition,t.method,t.context)},this):a.isObject(e)&&a.each(e,function(t,e){this.when(e,t)},this)},cases:{},getState:function(){return this.state},setState:function(t){return this.state!==t&&(this.state=t,this.trigger("state",this,t).trigger(t,this)),this},cache:function(t,e){return 1===arguments.length?this._cache[t]:(this._cache[t]=e,this)},when:function(t,e,i){return i=i||this,e=a.isString(e)?i[e]:e,this.control.when(t,e,i),this}}),r={enumerable:!1};o.assignStatic("statefulMethod",function u(t,e){if(a.isString(t)){var u=h(t,e);this.assignProto(t,u)}else a.each(t,function(t,e){this.statefulMethod(e,t)},this);return this},r),o.assignStatic("statefulMethods",o.statefulMethod,r),o.assignStatic("extendStatefulMethods",function(t){var e=this.extend();return e.statefulMethods(t),e},r)});