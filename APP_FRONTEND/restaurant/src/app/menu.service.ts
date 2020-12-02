import { Injectable } from '@angular/core';
import { Menu,UserRegister, UserLogin, UserToken} from './menu'
import { HttpClient, HttpResponse, HTTP_INTERCEPTORS} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuItemUrl  = 'http://localhost:3000/api/menu'; // for all menu collection
  private userLoginUrl  = 'http://localhost:4000/user/login'; 
  private menuItemfilterUrl  = 'http://localhost:3000/api/menu/substance/search'; 
  private userRegisterUrl  = 'http://localhost:4000/user/signup'; 
  constructor(private http:HttpClient) {  }

// to get the food list
getMenu() : Promise<void | Menu[]>
{
  return this.http.get(this.menuItemUrl).toPromise()
  .then(response => response as Menu[]).catch(this.handleError);
}

geFiltertMenu(searchstring: string) : Promise<void | Menu[]>
{
  return this.http.get(this.menuItemfilterUrl + '/' + searchstring).toPromise()
  .then(response => response as Menu[]).catch(this.handleError);
}

// to get the details of a single food
getSingleMenu(menuId: string): Promise<void | Menu>
{
  return this.http.get(this.menuItemUrl + '/' + menuId).toPromise()
  .then(response => response as Menu).catch(this.handleError);
}

 // POST operation to create a food
 createFood(newfood: Menu): Promise<void | Menu>{
  
  return this.http.post(this.menuItemUrl, newfood)
  .toPromise().then(response => {window.location.href = "/menu"})
  .catch(this.handleError);
}

  // PUT operation to update menu item
updateFood(newfood: Menu, menuId: string): Promise<void | Menu>{
console.log(newfood);
    return this.http.put(this.menuItemUrl + '/' + menuId, newfood)
    .toPromise().then(response => {window.location.href = "/menu"})
    .catch(this.handleError);
  }

  // to delete a food
deleteFood(foodId: string): Promise<void>
  {
    var input = confirm("Please press OK to confirm DELETION."); // take confirmation on deletion from user;
    if(input == true){
    return this.http.delete(this.menuItemUrl + '/' + foodId).toPromise()
    .then(response => {window.location.href = "/menu"}).catch(this.handleError);
    }
    else{
      return;
      //window.history.go(-1); // go back to the recipe details page
    }
  }

// LOGIN/REGISTER

tokendata: UserToken;

  userLogin(logindata: UserLogin): Promise<void | UserToken>{
    
    return this.http.post(this.userLoginUrl, logindata)
    .toPromise()
    .then((response: UserToken)=>{
      console.log(response);
      this.tokendata = response;
      sessionStorage.setItem('attempt', "3");
      sessionStorage.setItem('usertoken', this.tokendata.token);
      console.log(this.tokendata.token);
      window.location.href = "/menu";
  })
    .catch(this.error_login);
  }

  userRegister(registerdata: UserRegister): Promise<void | UserToken>{

    return this.http.post(this.userRegisterUrl, registerdata)
    .toPromise()
    .then((response: JSON)=>{
      //this.tokendata = response;
      
      sessionStorage.setItem('attempt', "3");
      window.location.href = "/login";
  })
    .catch(this.handleError);
  }

  private handleError(error: any)
{
  console.log(error);

  if(error.error.msg == "User Already Exists"){
    alert("User Already Exists");
    //window.location.href = "/register"
  }
  else {
    alert("Please enter a valid password. Minimum length = 6");
  }
  
 
}

private error_login(error: any)
{
var y = sessionStorage.getItem("attempt")

if(parseInt(y)  < 3 && parseInt(y) >0){
  alert(y + " Attemps left!")
  return;
}
else{
  window.location.href = "/register"
}

  console.log(error);
  //window.location.href = "/register"
}

}
