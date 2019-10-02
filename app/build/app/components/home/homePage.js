(function () {
    'use strict';

    angular
        .module('HomePage', ['ngRoute'])
        .config(['$routeProvider', HomePageConfig])
        .controller('homePageCtrl', HomePageCtrl)
        .directive('compile', function ($compile) {
            return function (scope, element, attr) {
                const body = angular.element(attr.compile)
                const compileFunc = $compile(body);
                compileFunc(scope)
                element.append(body)
            }
        })

    HomePageCtrl.$ingect = ['$scope', 'HomePageFactory']

    function HomePageCtrl($scope, HomePageFactory) {
        const vm = this;

        vm.test = function () {
            HomePageFactory.sendPost(vm.postArr[0])
        }

        vm.getPosts = function () {
            console.log('get post client')
            HomePageFactory.sendPost(vm.postArr)
        }
        console.log(HomePageFactory)
        vm.postArr = [{
            title: "Update: Twitter and TweetDeck hit with partial outages for hours",
            data: '2019-02-10',
            author: 'sergey',
            body: `<p>
            Update: Twitter has said it’s “just about fixed” the partial outages that hit its apps for around seven hours today, limiting the content users could post or access. <br>

Users should be able to Twitter as normal now or very shortly, per an update sent via its support account. It suggests anyone still experiencing problems should “give it a a few more minutes”, as well as thanking users for their patience.
                    </p>`,
            tag: 'Technology'
        }, {
            title: "Zuckerberg misunderstands the huge threat of TikTok",
            data: '2019-02-10',
            author: 'sergey',
            body: `<div>it’s almost like the Explore Tab that we have on Instagram” said Facebook CEO Mark Zuckerberg in leaked audio of him describing TikTok during an all-hands meeting. But it’s not. TikTok  represents a new form of social entertainment that’s vastly different from the lifelogging of Instagram where you can just take a selfie, show something pretty, or pan around what you’re up to. TikToks are premeditated, storyboarded, and vastly different than the haphazard Stories on Insta.</div>`,
            tag: 'Startup'
        }, {
            title: "Unagi is the iPhone of scooters you actually buy",
            data: '2019-01-10',
            author: 'sergey',
            body: `<div>Can you never find a scooter to rent when you need one? Here’s a radical idea. Buy one. While Bird, Lime, Skip, Scoot, Uber, Lyft and more compete for on-demand micromobility, a new startup invented a vehicle worthy of ownership. The Unagi looks downright futuristic with its classy paint jobs, foldable body, LED screen and built-in lights. The ride feels sturdy, strong and responsive while being light enough at 24 lbs to lug up subway stairs or the flights to your home./div>`,
            tag: 'Gadgets'
        }]


    }

    function HomePageConfig($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'app/components/home/homePage.html',
                resolve: {
                    user: function (Login, $q, $location) {
                        if (Login.getUsername()) {
                            return true
                        } else {
                            /* $location.path('/#') */
                            return $q.reject({
                                unAuthorized: true
                            })
                        }
                    }
                }
            })
    }
}());