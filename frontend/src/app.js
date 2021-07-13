import angular from 'angular'
import uiRouter from 'angular-ui-router'
import ocLazyLoad from 'oclazyload'
import 'angular-animate'
import 'angular-aria'
import 'angular-material'

import 'angular-material/angular-material.css'

import routing from './app.config'

import './app.css'

import MainModule from './modules/main/main.module'

angular.module('app', [uiRouter, ocLazyLoad, 'ngMaterial', MainModule])
  .config(routing)
