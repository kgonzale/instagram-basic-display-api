import angular from "angular";

import MainComponent from "./main.component";
import MainService from "./main.service";

const MainModule = angular
  .module("main", [])
  .component("mainComponent", MainComponent)
  .service("mainService", MainService).name;

export default MainModule;
