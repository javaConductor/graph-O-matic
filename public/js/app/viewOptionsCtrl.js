/**
 * Spacely Text & Binary Goods Inc.
 *
 * User: lcollins
 * Date: 9/26/13
 * Time: 12:14 AM
 *
 */


function ViewOptionsCtrl($scope, eventProcesor, viewService){

    $scope.options = {};

//    var relationshipTypes =

    $scope.options.filters.category = {
        useFilter: false,
        values: [],
        nameFn : function(cat){return cat.name;},
        valueFn:function(cat){return cat.id;},
        title: "Categories",
        class:"worldViewSettings",
        selectionClass: ""
    };

    $scope.options.filters.itemType = {
        useFilter: false,
        values: [],
        nameFn : function(it){return it.name;},
        valueFn:function(it){return it.id;},
        title: "Item Types",
        class:"worldViewSettings",
        selectionClass: ""
    };

    $scope.options.filters.relationship = {
        useFilter: false,
        values: [],
        nameFn : function(it){return it.name;},
        valueFn:function(it){return it.id;},
        title: "Relationships",
        class:"worldViewSettings",
        selectionClass: ""
    };

    /// listen for ViewSelectionChanges
    ///

}

ViewOptionsCtrl.$inject= ["$scope", "ContextEventProcessor", "View"]
