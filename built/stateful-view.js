//     stateful-view
//     (c) simonfan
//     stateful-view is licensed under the MIT terms.

define("__stateful-view/build-stateful-method",["require","exports","module","lodash","q"],function(t,e,i){var s=t("lodash"),a=t("q");i.exports=function(t,e){var i=t+":doing",n=t+":done";return function(){var h=this.getState();if(h===n||h===i)return this.cache(t);this.setState(i);var r=e.apply(this,arguments);return this.cache(t,r),a.isPromise(r)?r.done(s.partial(this.setState,n)):this.setState(n),r}}}),define("stateful-view",["require","exports","module","lowercase-backbone","lodash","./__stateful-view/build-stateful-method"],function(t,e,i){var s=t("lowercase-backbone"),a=t("lodash"),n=t("./__stateful-view/build-stateful-method"),h=i.exports=s.view.extend({initialize:function(t){s.view.prototype.initialize.apply(this,arguments),this.initializeStatefulView(t)},initializeStatefulView:function(t){t=t||{},this._cache={},a.bindAll(this,["setState","getState"])},getState:function(){return this.state},setState:function(t){return this.state!==t&&(this.state=t,this.trigger("state",this,t).trigger(t,this)),this},cache:function(t,e){return 1===arguments.length?this._cache[t]:(this._cache[t]=e,this)}}),r={enumerable:!1};h.assignStatic("statefulMethod",function u(t,e){if(a.isString(t)){var u=n(t,e);this.assignProto(t,u)}else a.each(t,function(t,e){this.statefulMethod(e,t)},this);return this},r),h.assignStatic("statefulMethods",h.statefulMethod,r),h.assignStatic("extendStatefulMethods",function(t){var e=this.extend();return e.statefulMethods(t),e},r)});