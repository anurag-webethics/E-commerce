<template>
  <div>
    <nav class="navbar navbar-expand-lg nav bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="/"><img src="/images/logo.png" class="nav-logo" alt=""></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon text-primary menu"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 justify-content-center  mb-lg-0">
            <li class="nav-item fs-5 fw-medium">
              <router-link class="nav-link text-light" to="/">Home</router-link>
            </li>
            <li class="nav-item fs-5 fw-medium">
              <a class="nav-link text-light" href="#">About Us</a>
            </li>
          </ul>
          <div class="button-group d-flex gap-2">
            <div class="d-flex gap-2" v-if="!token">
              <router-link to="/login" class="link-light link-offset-2 link-underline-opacity-0"><button type="button"
                  class="btn rounded-0 text-white login nav-btn">Login</button></router-link>
              <router-link to="/sign-up" class="link-light link-offset-2 link-underline-opacity-0"><button type="button"
                  class="btn rounded-0 text-white sign nav-btn">Signup</button></router-link>
            </div>
            <div v-else>
              <div class="d-flex">
                <router-link to="/profile/view" class="link-light link-offset-2 link-underline-opacity-0"><button
                    type="button" class="btn rounded-0 text-white profile nav-btn"><i class="fa-solid fa-user"
                      style="color: #ffffff;"></i> Profile</button></router-link>
                <button @click.pre="logout()" type="button"
                  class="btn rounded-0 text-white login nav-btn">Logout</button>
                <div class="pt-2 postion-relative">
                  <router-link to="/view/cart"><span>&#128722;</span></router-link>
                  <p id="cart-badge">{{cartCount}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>

export default {
  name: 'Header',
  props: {
      cartCount: 0,
  },
  data() {
    return {
      token: localStorage.getItem('authToken'),
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('authToken')
      this.$router.push('/login');
      console.log('token delete successfully');
    },
  }
}

</script>

<style scoped>
#cart-badge {
  color: white;
  position: absolute;
  background-color: red;
  height: 18px;
  width: 20px;
  border-radius: 50%;
  top: 40px;
  margin-left: 10px;
  text-align: center;
}
</style>