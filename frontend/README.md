# Build with [React.js](https://en.reactjs.org/)

### Client default settings:

##### server host=[localhost](http://localhost:3000)

##### server port=3000

##### script=EcmaScript5

##### language=TypeScript

# Page's list:
## Admin pages
- ![BannerURL](https://img.shields.io/badge/Banners&nbsp;Page-http://localhost:3000/admin/banners-<blue>?style=for-the-badge)
- ![CategoriesURL](https://img.shields.io/badge/Categories&nbsp;Page-http://localhost:3000/admin/banners-<blue>?style=for-the-badge)
- ![LoginURL](https://img.shields.io/badge/Login&nbsp;Page-http://localhost:3000/admin/login-<blue>?style=for-the-badge)
## User page
![HomeURL](https://img.shields.io/badge/User&nbsp;Page-http://localhost:3000/home-<blue>?style=for-the-badge)
## 404 page
![404URL](https://img.shields.io/badge/404&nbsp;Page-all&nbsp;incorrect&nbsp;urls&nbsp;which&nbsp;starts&nbsp;by&nbsp;http://localhost:3000/-<blue>?style=for-the-badge)
# Redux
## The JWT authentication token stored in local storage 
### Other data fetches by requests
# Requests
## public
### - ![GetCategories](https://img.shields.io/badge/GET-http://localhost:8080/getCategories-<blue>?style=flat-square&l)
- **parameters** : none  
- **headers** : 'Authorization' : 'Bearer '
### - ![GetBannerId](https://img.shields.io/badge/GET-http://localhost:8080/bid-<blue>?style=flat-square&l)
- **parameters** : ['cat'] : array of selected categories request's id. Example{cat=request1&cat=request2}
- **headers** : 'Authorization' : 'Bearer '
## private
### get mapping
#### - ![GetBanners](https://img.shields.io/badge/GET-http://localhost:8080/api/private/getBanners-<blue>?style=flat-square&l&color=9c0b0b&labelColor=242424)
- **parameters** : none  
- **headers** : 'Authorization' : 'Bearer '
### put mapping
#### - ![SaveBanner](https://img.shields.io/badge/PUT-http://localhost:8080/api/private/banners/save/{:bannerId}-<blue>?style=flat-square&l&color=9c0b0b&labelColor=242424)
- **description** : updates or creates the banner which selected by admin
- **parameters** : selected banner id  , query : ['createNew'] : true/false
- **headers** : 'Authorization' : 'Bearer '
- **payload** : 
   1. **id** : number,//static
   2. **linkedCategories** : array of ICategory interface // new linked categories list of banner
   3. **name** : string,//new name of banner
   4. **price** : number,//new price of banner
   5. **textField** : string, // new text of banner
- **exceptions** : 
  1. **response status = 409** - banner name is already exist
  2. **response status = 402** - linked categories must by non-empty
#### - ![SaveCategory](https://img.shields.io/badge/PUT-http://localhost:8080/api/private/categories/save/{:bannerId}-<blue>?style=flat-square&l&color=9c0b0b&labelColor=242424)
- **description** : updates or creates the category which selected by admin
- **parameters** : selected category id , query : ['createNew'] : true/false
- **headers** : 'Authorization' : 'Bearer '
- **payload** : **ICategory** data
- **exceptions** : 
  1. **response status = 409** - category name | request id already exist!
  2. **response status = 402** - category name | request id cannot be empty!
#### - ![DeleteCategory](https://img.shields.io/badge/PUT-http://localhost:8080/api/private/categories/delete/{:id}-<blue>?style=flat-square&l&color=9c0b0b&labelColor=242424)
- **description** :deletes the category by id 
- **parameters** : selected category id  
- **headers** : 'Authorization' : 'Bearer '
- **exceptions** : 
  1. **response status = 409** - cannot delete category because of linked banners with it
### delete mapping
#### - ![DeleteBanner](https://img.shields.io/badge/DELETE-http://localhost:8080/api/private/banners/delete/{:id}-<blue>?style=flat-square&l&color=9c0b0b&labelColor=242424)
- **description** :deletes the banner by id 
- **parameters** : selected banner id  
- **headers** : 'Authorization' : 'Bearer '
- **exceptions** : 
1. **response status = 409** - incorrect index send to server!
### post mapping
#### - ![authenticate](https://img.shields.io/badge/POST-http://localhost:8080/api/private/authenticate-<blue>?style=flat-square&l&color=9c0b0b&labelColor=242424)
- **description** : authenticate request
- **headers** : 'Authorization' : 'Bearer '
-  **payload** : 
   1. **login** : string
   2. **password** : string
- **exceptions** : 
1. **response status = 401** - bad credentials!

