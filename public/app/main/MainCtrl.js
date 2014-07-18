angular.module('app').controller('mainCtrl', ['$scope', 'wordsFactory', function ($scope, wordsFactory) {
    $scope.words = wordsFactory.words;
    $scope.count=function(){
        var maxB=300;
        var currentBudjet=wordsFactory.getBudjet();
        $scope.max=((maxB-currentBudjet)<0)?0:((maxB-currentBudjet));
        $scope.budjet = currentBudjet;

    };
    $scope.count();
    $scope.$watch(function($scope){
        return $scope.words.map(function(word){
            return word.spending;
        });
    },function(){
        $scope.count();
    },true);


}]);
angular.module('app').directive('slider', ['$parse',function ($parse) {
    return {
        require: 'ngModel', // http://stackoverflow.com/questions/12789136/optimizing-angularjs-directive-that-updates-ng-model-and-ng-style-on-focus
        restrict: 'A',
        link: function (scope, element, attrs, model) {
            var createSlider = function (max) {
                var slider = $(element).slider({
                    orientation: attrs.sliderorientation || 'horizontal',
                    min: parseFloat(attrs.slidermin || 0),
                    max: (max>=0)?max:0,
                    step: parseFloat(attrs.sliderstep || 1),
                    range: attrs.sliderrange || 'min',
                    value: model.$viewValue,
                    slide: function (event, ui) {
                        scope.$apply(function () {
                            model.$setViewValue(ui.value);
                            if (attrs.sliderslide) {
                                scope.$eval(attrs.sliderslide);
                            }
                        });
                       // console.log(arguments);
                    }
                });
                scope.$watch(attrs.ngModel, function (value) {
                    slider.slider('value', value);
                    console.log();
                  // attrs.count();
                });

            };
            createSlider(attrs.slidermax);
            scope.$watch('max',function(val){
                createSlider(attrs.slidermax);
            });

        }
    };
}]);
angular.module('app').factory('wordsFactory', [function () {
    var
        words = [
            {
                'id': 1,
                'word': 'Object',
                'spending': 12
            },
            {
                'id': 2,
                'word': 'Object',
                'spending': 13
            },
            {
                'id': 3,
                'word': 'Object',
                'spending': 13
            }


        ];
    var getBudjet = function () {
        var sum = 0,w;
        for (w in words)
        {
        sum += words[w].spending;
        }
        return sum;
    }
    return {
        'words': words,
        'getBudjet': getBudjet

    };
}]);