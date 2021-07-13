routing.$inject = ['$urlRouterProvider', '$locationProvider', '$stateProvider']

export default function routing ($urlRouterProvider, $locationProvider, $stateProvider) {
  $locationProvider.html5Mode(false)
  $urlRouterProvider.otherwise('/')

  $stateProvider.state('main', {
    url: '/',
    component: 'mainComponent'
  })
}
