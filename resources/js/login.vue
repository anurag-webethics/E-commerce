<template>
  <div class="container login-form">

    <div class="row align-items-center justify-content-center g-1 gap-2">

      <div class="col col-sm-12 col-lg-7 form-img">
        <img src="images/login/Illustration.png" class="img-fluid" alt="..." height="80%" width="95%">
      </div>

      <div class="col col-sm-12 col-lg-4 form">

        <form @submit.prevent="login">
          <div class="d-flex justify-content-center align-items-center flex-column">

            <!-- <div class="alert alert-success alert-dismissible fade show" role="alert" id="successMessage">
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div> -->

            <h3 class=" fs-2 fw-bold">Login to your account</h3>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label pt-4 text-secondary fw-bold fs-6">E-mail</label>

              <div class="login-input border d-flex p-2 align-items-center">
                <img src="images/login/Suche.png" class=" login-logo mx-1" alt="" height="21" width="25">
                <input type="text" name="email" class="form-control d-block fs-5  rounded-0  input border border-0"
                  placeholder="Your e-mail" v-model="userLogin.email" value="">
              </div>
              <span class="text-danger">
                {{ userRequestError.email ? userRequestError.email[0] : '' }}
              </span>
            </div>

            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label text-secondary fw-bold fs-6">Password</label>
              <div class="login-input border d-flex p-2 align-items-center">
                <img src="images/login/Suche (1).png" class=" login-logo mx-1" alt="" height="14" width="26">
                <input type="password" class="form-control d-block fs-5 rounded-0  input border border-0"
                  aria-describedby="emailHelp" name="password" v-model="userLogin.password"
                  placeholder="Enter passwords">
                <img src="images/login/Suche (2).png" class="ms-auto ps-2" alt="">
              </div>
              <span class="text-danger">
                {{ userRequestError.password ? userRequestError.password[0] : '' }}
              </span>
            </div>


            <div class="mb-3 form-check py-2">
              <input type="checkbox" class="form-check-input rounded-1 p-2 border border-2 border-secondary"
                id="exampleCheck2">
              <label class="form-check-label text-secondary fw-bold fs-6 lh-base ps-1 pt-1" for="exampleCheck1">Remember
                me
              </label>
              <a href="" class="ms-3">Forget password?</a>
            </div>
            <button type="submit" name="submit"
              class="btn btn-primary rounded-0 btn-lg login-form-btn rounded-1 form-btn fw-bold border-0">Log
              In</button>
            <button type="button"
              class="btn text-black fw-bold fs-5 btn-outline-secondary rounded-1 mt-3 btn-lg form-btn">
              <img src="images/login/icons8-google-48.png" alt="" height="28">
              Continue with Google
            </button>
            <div class="pt-3 ">
              <p class="text-black fw-bold fs-5">Don't have an account yet? <a href=""
                  class="link-primary link-offset-2 fw-bold link-underline-opacity-0">Sign Up</a></p>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import http from './axios';

export default {
  name: 'login',
  data() {
    return {
      userLogin: {
        email: '',
        password: '',
      },
      userRequestError: '',
    }
  },
  methods: {
    login() {
      http.post('login', this.userLogin)
        .then((response) => {
          if (response.status == 200) {
            const token = response.data.user.token;
            localStorage.setItem('authToken', token);
            this.$router.push('/');
          }
        })
        .catch((error) => {
          const responseError = error.response.data.errors;
          this.userRequestError = responseError;
          console.log(error);
        })
    }
  },
}
</script>

<style scoped></style>