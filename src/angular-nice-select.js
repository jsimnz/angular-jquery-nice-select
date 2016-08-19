/* Angular Nice Select v0.1
 *
 * Author: John-Alan Simmons 
 *
 * An AngularJS directive for the jquery-nice-select library
 *
 * Licensed under the MIT License
 * 2015 John-Alan Simmons.
 */

angular.module('ui.nice-select', [])

.directive("uiNiceSelect", function() {
	
	var selectHasValue = function(element, val) {
		var foundValue = false
		angular.forEach(element.find("option"), function(childEl) {
			var val = $(childEl).attr("value")
			if (val.toString() == foundValue.toString()) {
				foundValue = true
			}
		})
		return foundValue;
	}

	var updateNiceSelect = function(element, val) {
		// get select option val representation
		var optionEl = element.find("[value=\"" + val + "\"]")
		var optionVal = optionEl.data("display") || optionEl.text();

		var ns = element.next();
		// update the display text of the niceSelect
		ns.find(".current").text(optionVal)
		// update the selected option in niceSelects dropdown
		ns.find(".list .selected").removeClass("selected")
		ns.find(".list [data-value=\"" + val + "\"]").addClass("selected")
	}

	return {
		restrict: "A",
		require: 'ngModel',
		scope: {
			ngModel: "="
		},
		link: function(scope, element, attrs, ngModel) {
			'use strict'

			// update the nice select element when the ngModel changes
			ngModel.render = function() {
				var selectVal = ngModel.$modelValue;
				console.log("select val:",selectVal)
				if (selectVal !== null && selectVal !== '' && selectHasValue(element, selectVal)) {
	                throw new Error('ng-Model value can\'t be null, and must be a valid select element value');
	            }
	            updateNiceSelect(element, selectVal)
			}

			// watch for changes on the ngModel
			scope.$watch('ngModel', function() {
				ngModel.render()
			})

			scope.$watch(
			    function () { return element[0].innerText; },
			    function (newValue, oldValue) {
			      element.niceSelect('update')
			    }
			  );

			// initialize the niceSelect element on first run
			element.niceSelect()
		}
	}
})

/*
 
 Use the directive in the following way

	<select ui-nice-select ng-model='some-variable'>
	  <option value="1">Some option</option>
	  <option value="2">Another option</option>
	  <option value="3" disabled>A disabled option</option>
	  <option value="4">Potato</option>
	</select>

 */
