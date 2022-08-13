import { profileNameElement, profileJobElement } from "../utils/constants.js";

export default class Userinfo {
  constructor({nameSelector, jobSelector}) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    
  }

  getUserInfo() {
    return {name: this._nameElement.textContent, job: this._jobElement.textContent};
  }

  setUserInfo(name, job) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
   }
}