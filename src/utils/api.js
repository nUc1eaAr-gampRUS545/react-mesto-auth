

 class Api {
  #userUrl;
  #headers;
  constructor({baseURL,headers}) {
    this.#userUrl = baseURL;
    this.#headers=headers
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}
  getInitialCards() {
    return fetch(`${this.#userUrl}/cards`, {
      method:"GET",
      headers: this.#headers})
      .then(this._checkResponse)
      
  }
  addMyCards(data){ 
    return fetch(`${this.#userUrl}/cards`, {
        method:"POST",
        headers:this.#headers,
        body: JSON.stringify(data)
        })
        .then(this._checkResponse)
  }
  replaceInfo(data){  
    return fetch(`${this.#userUrl}/users/me`, {
        method:"PATCH",
        headers:this.#headers,
        body: JSON.stringify(data)
        })
        .then(this._checkResponse)
  }
  
  getInfo(){
    return fetch(`${this.#userUrl}/users/me`, {
      method:"GET",
      headers: this.#headers})
      .then(this._checkResponse)
  }
  setLikes(data,isLiked){  
  return fetch(`${this.#userUrl}/cards/${data}/likes`, {
    method: (isLiked ? 'DELETE' : 'PUT'),
    headers:this.#headers})
    .then(this._checkResponse)
  }

changeProfile(data){
  return fetch(`${this.#userUrl}/users/me/avatar`, {
    method:"PATCH",
    headers: this.#headers,
    body: JSON.stringify(data)})
      .then(this._checkResponse)
}  

deleteCard(data){
  return fetch(`${this.#userUrl}/cards/${data}`, {
    method:"DELETE",
    headers: this.#headers})
    .then(this._checkResponse)
}
}
 const api = new Api({baseURL:`https://mesto.nomoreparties.co/v1/cohort-65`,headers:{
  authorization: "6af0fad8-3b2e-4d49-af39-c98a3c186d35",
  'Content-Type': 'application/json'}});
  export default api;