/**
 * Created with JetBrains WebStorm.
 * User: lee
 * Date: 5/12/13
 * Time: 5:09 PM
 */
/*
<graph-view ng-model="sampleView"  viewIndex="21" />
 */
function ViewCtrl(scope, worldSvc, constants){
	console.log("ViewCtrl.link(("+scope.$id+")): Creating.");

    /// what is in the scope?:
        // view: the view
        // currentViewId : id of the currently selected view
        //
    scope.model = {};

    scope.model.currentViewId = 0;

    var viewsP = worldSvc.views();

    //// the problem  -  we do not have the scope.view
    // value until the 'then' fn is called
    viewsP.then(function(views){
        if( views && views[0] ){
            scope.$apply(function(){
                scope.model.view = views[0];
            });
        }
    });

    var item1  = {
        item : {id: "item3", itemType:{ id: "it2", name:"Person"} },
        id: "vitem3",

        position: function(){
            return {x: 550, y: 150};
        },
        title: function(){
            return "Ruby V. Collins";
        },
        description: function() {
            return "Mom";
        },
        image: function(){
            return "/images/redFist.jpg";
        },
        data: function(){
            return [
                {name:"Firstname", value:"Ruby"},
                {name:"Lastname", value:"Collins"},
                {name:"Email", value:"mom@me.us"},
                {name:"Address", value:"11302 S Normal Av"},
                {name:"City", value:"Chicago"},
                {name:"State", value:"IL"},
                {name:"Home Phone", value : "7738215589"},
                {name:"Work Phone", value : "7736672626"}
            ];
        }
    };

    var item2 = {
        item : {id: "item2", itemType:{ id: "it2", name:"Person"} },
        id: "vitem2",

        position: function(){
            return {x: 150, y: 150};
        },
        title: function(){
            return "David Collins";
        },
        description: function() {
            return "Mini Me";
        },
        image: function(){
            return "/images/blackLight.jpg";
        },
        data: function(){
            return [
                {name:"Firstname", value:"David"},
                {name:"Lastname", value:"Collins"},
                {name:"Email", value:"you@me.us"},
                {name:"Address", value:"6640 S Vernon Av"},
                {name:"City", value:"Chicago"},
                {name:"State", value:"IL"},
                {name:"Game Phone", value : "7739555589"},
                {name:"Work Phone", value : "7736678236"},
                {name:"Game1", value : "ROBLOX"},
                {name:"Game2", value : "StickPage.com"},
                {name:"Game3", value : "Mind Craft"}
            ];
        }
    };

    scope.view2 =
    {
        id: "test-view-1",
        name: "super view 1",
        typeName: "baseVT",
        items: [item2,item1]
    };

    // get the viewId from the location
    // try to fetch the view
    // if found, set the scope.view to the view
    // if not found, redir to the view Not Found page
	console.log("ViewCtrl.link(("+scope.$id+")): Created.");

}

ViewCtrl.$inject = [ "$scope", "GraphWorld","ConstantsService" ];
