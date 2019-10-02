angular.module('todo')
    .factory('HomePageFactory', HomePageFactory)

HomePageFactory.$inject = ['$http', '$cookies']

function HomePageFactory($http, $cookies) {
    const Content = {}
    Content.addHeader = () => {
        if ($http.defaults.headers.common['token'] == undefined) {
            $http.defaults.headers.common['token'] = `Token ${$cookies.get('token')}`
        }
    }
    Content.test = 'Content test'
    Content.getPosts = () => {
        if (typeof $cookies.get('token') !== 'undefined') {
            $http.defaults.headers.common['token'] = `Token ${$cookies.get('token')}`
        }
        $http.get('http://localhost:4000/getPosts')


    }
    Content.sendPost = async (PostBody) => {
    Content.addHeader()
        const connect = await $http.post('http://localhost:4000/test', PostBody)
        const data = await connect
        console.log(data)


    }

    return Content
}