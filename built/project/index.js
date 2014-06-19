//     StatefulView
//     (c) simonfan
//     StatefulView is licensed under the MIT terms.

define(["require","exports","module","lowercase-backbone","lodash","./__stateful-view/build-stateful-method"],function(e,t,n){var r=e("lowercase-backbone"),i=e("lodash"),s=e("./__stateful-view/build-stateful-method"),o=n.exports=r.view.extend({initialize:function(t){r.view.prototype.initialize.apply(this,arguments),this.initializeStatefulView(t)},initializeStatefulView:function(t){t=t||{},this.state=t.state||this.state,this._cache={},i.bindAll(this,["setState","getState"])},getState:function(){return this.state},setState:function(t){return this.state=t,this},cache:function(t,n){return arguments.length===1?this._cache[t]:(this._cache[t]=n,this)}});o.assignStatic({statefulMethod:function u(e,t){if(i.isString(e)){var u=s(e,t);this.assignProto(e,u)}else i.each(e,function(e,t){this.statefulMethod(t,e)},this);return this}})});