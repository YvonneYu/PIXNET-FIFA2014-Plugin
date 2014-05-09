/**
 * Created by yue on 2014/5/2.
 */


angular.module('mainService', [])
    .constant('SERVICE_URL', {
        //window.location.protocol
        'pixnet_host': 'http://emma.pixnet.cc/'
    })
    .factory('allUsersInfo', function($q, pixnetService) {

        return function (){
            //spk, wtssoccer, TPCMAXA, yeadean
            var userList = ['spk', 'wtssoccer', 'TPCMAX', 'yeadean'];
            var promises = userList.map(function(user) {
                return pixnetService.getUserInfo(user);
            });
            return $q.all(promises);
        }
    })
    .service('pixnetService', function (SERVICE_URL, $http) {

        function getData(url, query){
            var queryString =  {format: 'json', callback: 'JSON_CALLBACK'};
            query = query ? angular.extend(query, queryString) : queryString;

                // your ajax request here
//                return $http({
//                    method: 'GET',
//                    url: url,
//                    params: query
//                }).success(function (data, status, headers, config) {
//                        return data;
//                    }).error(errorCallBack);

                return $http.jsonp(url, {
                    params: query
                   }).success(function (data, status, headers, config) {
                            console.log(data);
                        return data;
                    }).error(errorCallBack);


        }
        function errorCallBack(data, status, headers, config){
            console.log('data: ', data);
            console.log('status: ', status);
            console.log("config: ", config);
        }

        function getUserInfo(usrID){
            //http://emma.pixnet.cc/users/:id
            var url = SERVICE_URL.pixnet_host + 'users/'+ usrID;
            return getData(url);
        }

        function getUserArticles(usrID, page){
            //http://emma.pixnet.cc/blog/articles?user=:id
            var url = SERVICE_URL.pixnet_host + 'blog/articles',
                query = {user: usrID, per_page: 10, page: page || 1};
            return getData(url, query);
        }

        function getUserHotArticles(usrID){
            //http://emma.pixnet.cc/blog/articles/hot?user=:id
            var url = SERVICE_URL.pixnet_host + 'blog/articles/hot',
                query = {user: usrID, trim_user: 1};
            return getData(url, query);
        }

        function getUserLatestArticles(usrID){
            //http://emma.pixnet.cc/blog/articles/latest?user=:id
            var url = SERVICE_URL.pixnet_host + 'blog/articles/latest',
                query = {user: usrID, trim_user: 1};
            return getData(url, query);

        }

        function getArticle(usrID, articleID){
            //http://emma.pixnet.cc/blog/articles/:articleID?user=:usrID
            var url = SERVICE_URL.pixnet_host + 'blog/articles/' + articleID,
                query = {user: usrID};
            return getData(url, query);
        }

        return {
            getData: getData,
            getUserInfo: getUserInfo,
            getUserArticles: getUserArticles,
            getUserHotArticles: getUserHotArticles,
            getUserLatestArticles: getUserLatestArticles,
            getArticle: getArticle
        }
    })

