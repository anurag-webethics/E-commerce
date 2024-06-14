<template>
  <!-- sign-up  -->
  <div class="container login-form">

    <div class="row  justify-content-center g-1 gap-2">

      <div class="col col-sm-12 col-lg-7 form-img">
        <img src="images/Registration/Group 1597882533 (1).png" class="img-fluid" alt="..." height="90%" width="90%">
      </div>

      <div class="col col-sm-12 col-lg-4 form">

        <form @submit.prevent="submitData">

          <div class="d-flex justify-content-center align-items-center flex-column">

            <h3 class=" fs-2 fw-bold">Signup to your account</h3>

            <div>
              <label for="userName" class="form-label pt-4 text-secondary fw-bold fs-6">User
                Name</label>
              <div class="login-input border d-flex p-2 align-items-center">
                <img src="images/Registration/Vector.png" class=" login-logo mx-1" alt="" height="21" width="25">
                <input type="text" name="userName" class="form-control d-block fs-5  rounded-0  input border border-0"
                  id="userName" v-model="UserDetail.username" placeholder="User">
              </div>
              <span class="text-danger">
                {{ UserRequestError.username ? UserRequestError.username[0] :''}}
              </span>
            </div>

            <div class="mb-3">
              <label for="fname" class="form-label pt-4 text-secondary fw-bold fs-6">First
                Name</label>
              <div class="login-input border d-flex p-2 align-items-center">
                <img src="images/Registration/Vector.png" class=" login-logo mx-1" alt="" height="21" width="25">
                <input type="text" name="fname" class="form-control d-block fs-5  rounded-0  input border border-0"
                  id="firstName" v-model="UserDetail.firstname" placeholder="Johan">
              </div>
              <span class="text-danger">
                {{ UserRequestError.firstname ? UserRequestError.firstname[0] : '' }}
              </span>
            </div>

            <div class="mb-3">
              <label for="lname" class="form-label  text-secondary fw-bold fs-6">Last
                Name</label>

              <div class="login-input border d-flex p-2 align-items-center">
                <img src="images/Registration/Vector.png" class=" login-logo mx-1" alt="" height="21" width="25">
                <input type="text" class="form-control d-block fs-5  rounded-0  input border border-0" id="lastName"
                  name="lname" v-model="UserDetail.lastname" placeholder="Deo">
              </div>
              <span class="text-danger">
                {{ UserRequestError.lastname ? UserRequestError.lastname[0] : '' }}
              </span>
            </div>

            <div class="mb-3">
              <label for="email" class="form-label text-secondary fw-bold fs-6">E-mail</label>
              <div class="login-input border d-flex p-2 align-items-center">
                <img src="images/login/Suche.png" class=" login-logo mx-1" alt="" height="21" width="25">
                <input type="text" class="form-control d-block fs-5  rounded-0  input border border-0"
                  id="exampleInputEmail13" v-model="UserDetail.email" name="email" placeholder="example.com">
              </div>
              <span class="text-danger">
                {{ UserRequestError.email ? UserRequestError.email[0] : '' }}
              </span>
            </div>

            <div class="mb-3">
              <label for="password" class="form-label text-secondary fw-bold fs-6">Password</label>
              <div class="login-input border d-flex p-2 align-items-center">
                <img src="images/login/Suche (1).png" class=" login-logo mx-1" alt="" height="14" width="26">
                <input type="password" class="form-control d-block fs-5 rounded-0  input border border-0"
                  name="password" v-model="UserDetail.password" placeholder="Enter passwords">
                <img src="images/login/Suche (2).png" class="ms-auto ps-2" alt="">
              </div>
              <span class="text-danger">
                {{ UserRequestError.password ? UserRequestError.password[0] : '' }}
              </span>
            </div>

            <div class="mb-3">
              <label for="country" class="form-label  text-secondary fw-bold fs-6">City</label>
              <div class="login-input border d-flex p-2 align-items-center">
                <img src="images/Registration/Vector (1).png" class=" login-logo mx-1" alt="" height="21" width="25">
                <select class="form-select border-0 fs-5" aria-label="Default select example" v-model="UserDetail.city"
                  name="country">
                  <option value="">Select your city</option>
                  <option value="Chandigarh">Chandigarh</option>
                </select>
              </div>
              <span class="text-danger">
                {{ UserRequestError.city ? UserRequestError.city[0] : '' }}
              </span>
            </div>

            <div class="mb-3">
              <label for="street" class="form-label pt-4 text-secondary fw-bold fs-6">street</label>
              <div class="login-input border d-flex p-2 align-items-center">
                <img src="images/Registration/Vector.png" class=" login-logo mx-1" alt="" height="21" width="25">
                <input type="text" name="street" class="form-control d-block fs-5  rounded-0  input border border-0"
                  id="street" v-model="UserDetail.street" placeholder="Main Street">
              </div>
              <span class="text-danger">
                {{ UserRequestError.street ? UserRequestError.street[0] : '' }}
              </span>
            </div>

            <div class="mb-3">
              <label for="zipcode" class="form-label pt-4 text-secondary fw-bold fs-6">zipcode</label>
              <div class="login-input border d-flex p-2 align-items-center">
                <img src="images/Registration/Vector.png" class=" login-logo mx-1" alt="" height="21" width="25">
                <input type="text" name="zipcode" class="form-control d-block fs-5  rounded-0  input border border-0"
                  id="zipcode" v-model="UserDetail.zipcode" placeholder="51234">
              </div>
              <span class="text-danger">
                {{ UserRequestError.zipcode ? UserRequestError.zipcode[0] : '' }}
              </span>
            </div>

            <div class="mb-3">
              <label for="phone" class="form-label pt-4 text-secondary fw-bold fs-6">phone</label>
              <div class="login-input border d-flex p-2 align-items-center">
                <img src="images/Registration/Vector.png" class=" login-logo mx-1" alt="" height="21" width="25">
                <input type="text" name="phone" class="form-control d-block fs-5  rounded-0  input border border-0"
                  id="phone" v-model="UserDetail.phone" placeholder="1234567890">
              </div>
              <span class="text-danger">
                {{ UserRequestError.phone ? UserRequestError.phone[0] : '' }}
              </span>
            </div>

            <div class="mb-3 form-check pt-3 pb-3">
              <input type="checkbox" class="form-check-input rounded-1 p-2 border border-2 border-secondary"
                id="exampleCheck18">
              <label class="form-check-label text-secondary fw-bold fs-6 lh-base ps-1 pt-1" for="exampleCheck1">I have
                read the <a href="./forms/login.html"
                  class="link-dark link-offset-2 link-underline-opacity-50 link-underline-secondary">Terms
                  & Conditions</a>
              </label>
            </div>
            <button type="submit" name="submit"
              class="btn btn-primary rounded-0 btn-lg login-form-btn rounded-1 form-btn fw-bold border-0">Sign
              Up</button>
            <button type="button"
              class="btn text-black fw-bold fs-5 btn-outline-secondary rounded-1 mt-3 btn-lg form-btn">
              <img src="images/login/icons8-google-48.png" alt="" height="28">
              Continue
              with Google
            </button>
            <div class="pt-3 ">
              <p class="text-black fw-bold fs-5">Don't have an account yet? <a href="/auth/login.php"
                  class="link-primary link-offset-2 fw-bold link-underline-opacity-0">Sign In</a></p>
            </div>
          </div>

        </form>

        <strong>{{ output }}</strong>

      </div>

    </div>

  </div>

</template>

<script>
import http from './axios';

export default {
  name: 'registration',
  data() {
    return {
      UserDetail: {
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        city: '',
        street: '',
        zipcode: '',
        phone: '',
      },
      UserRequestError: '',
      output: '',
    }
  },

  methods: {
    submitData() {
      http.post('signup', this.UserDetail)
        .then((response) => { if(response.status == 200){
          this.$router.push('/login');
        } })
        .catch((error) => {
          let responseError = error.response.data.errors;
          this.UserRequestError = responseError;
        })
    }
  },

}

</script>

<style scoped></style>