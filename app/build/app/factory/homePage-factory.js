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
    Content.getPosts = async () => {
        if (typeof $cookies.get('token') !== 'undefined') {
            $http.defaults.headers.common['token'] = `Token ${$cookies.get('token')}`
        }
        console.log('getPosts factory')
        const data = await $http.get('http://localhost:4000/getPosts')
        Content.posts = data.data
        return data.data


    }
    Content.sendPost = async (PostBody) => {
        Content.addHeader()
        const connect = await $http.post('http://localhost:4000/sendPost', PostBody)
        const data = await connect
        console.log(data)
        /* console.log(PostBody) */


    }

    return Content
}