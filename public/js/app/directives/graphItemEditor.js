/**
 * Spacely Text & Binary Goods Inc.
 *
 * User: lcollins
 * Date: 11/18/13
 * Time: 12:47 AM
 *
 */

angular.module('graphOmatic.directives', []).
    directive('graph-item-editor', ['$compile', '$parse', 'UtilityFunctions', function ($compile, $parse, utils) {


        var combinePropertiesWithData = function combinePropertiesWithData(properties, data, bExtrasAllowed){

            var propNames = properties.map(function(p){ return p.name; });
            var propDataList = properties.map(function(prop){

                var propData = utils.copy({}, prop);
                propData.value = data[prop.name];
                return propData;
            });

            var all  = [];
            /// add the rest of the (undocumented) data values - if allowed
            if(bExtrasAllowed){
                // get the diff between propNames and data.keys()
                var extras = propNames.diff(data.keys());
                var xtraPropDataList = extras.map(function(extra){
                    var xtraData = data[extra];

                    return {
                        name: extra,
                        type: xtraData.type,
                        value: xtraData.value,
                        required: false,
                        extra: true
                    };
                });

                // concat propDataList + xtraPropDataList
                all = propDataList.concat(xtraPropDataList);

            }
            else{
                all = propDataList;
            }

            return all;
        };

        /**
         * Implements property ranking rules.
         *
         * @param prop
         * @param effectiveProps
         *
         * @returns the rank of the properties - props sorted by (rank,name)
         */
        var rankProperty = function(effectiveProps, prop){
            var rank = 500;// normal
            var effProp =effectiveProps[prop];

            if (effProp.required && effProp.defaultValue  ){
                rank = 1000;
            }else if (effProp.required  ){
                rank = 900;
            }else
                if(effProp.extra){
                    rank = 800;
               }
            return rank;
            };

        return {
            restrict: 'E',
            replace: true,
            scope: true,
            'require': '?ngModel',
            link: function (scope, element, attrs, model) {

                if (!model)
                    return;

                var mdl = $parse(attrs.ngModel);
                var itemData = mdl(scope.$parent);

                /// change the view if the data changes
                model.$render = function () {
                    /// redisplay the item inside the view
                    if (this.$modelValue) {
                        // use new value
                        // nuData = this.$modelValue;
                    }
                }
            }
        };
    }]);
