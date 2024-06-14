<template>
  <div>
    <!-- upload data  -->

    <div class="container py-5">

      <div class="row row-cols-1 row-cols-md-3 g-4 flex-wrap detail-col">

        <div class="col-sm-6 col-md-12 col-lg-5 mb-3 mb-sm-0 detail-row">
          <div class="card bg-body-tertiary d-flex justify-content-center align-items-center py-5 h-100">
            <img src="images/default.jpg" alt="" class="rounded-circle" width="40%">
            <div class="card-body text-center">
              <h2 class="text-dark fw-semibold">Anurag thakur</h2>
              <p class="fw-bold fs-5">Email- anuragthakur123@gmail.com</p>
              <p class=" fs-5">Phone- 259 875 69875</p>
              <router-link to="/profile/edit" class="link-light link-offset-2 link-underline-opacity-0">
                <button type="button" class="btn btn-primary rounded-0 fs-5">Edit</button>
              </router-link>
            </div>
          </div>
        </div>

        <div class="col-sm-6 col-md-12 col-lg-7 detail-row">
          <div class="card bg-body-tertiary p-5 h-100">
            <div class="row flex-wrap flex g-4">
              <div class="col-6 col-sm-4 col-md-6 col-lg-4 fs-5 lh-lg fw-semibold text-dark">First Name</div>
              <div class="col-6 col-sm-4 col-md-6 col-lg-8 fs-5 lh-lg  fw-semibold text-dark">Anurag</div>

              <div class="col-6 col-sm-4 col-md-6 col-lg-4 fs-5 lh-lg fw-semibold text-dark">Last Name</div>
              <div class="col-6 col-sm-4 col-md-6 col-lg-8 fs-5 lh-lg  fw-semibold text-dark">Thakur</div>

              <div class="col-6 col-sm-4 col-md-6 col-lg-4 fs-5 lh-lg fw-semibold text-dark">Gender</div>
              <div class="col-6 col-sm-4 col-md-6 col-lg-8 fs-5 lh-lg  fw-semibold text-dark">Male</div>

              <div class="col-6 col-sm-4 col-md-6 col-lg-4 fs-5 lh-lg fw-semibold text-dark">Country</div>
              <div class="col-6 col-sm-4 col-md-6 col-lg-8 fs-5 lh-lg  fw-semibold text-dark">India</div>

              <div class="col-6 col-sm-4 col-md-6 col-lg-4 fs-5 lh-lg fw-semibold text-dark">Hobbies</div>
              <div class="col-6 col-sm-4 col-md-6 col-lg-8 fs-5 lh-lg  fw-semibold text-dark">Programming</div>

            </div>

          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'UserDetail'
}
</script>

<style scoped></style>