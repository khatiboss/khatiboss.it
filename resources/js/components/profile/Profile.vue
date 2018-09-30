<style>
    .widget-user-header {
        background-position: center center;
        background-size: cover;
        height: 240px !important;
    }

</style>
<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12 mt-3">
                <!-- Widget Card-->
                <div class="card card-widget widget-user">
                    <!-- Add the bg color to the header using any of the bg-* classes -->
                    <div class="widget-user-header text-white" style="background-image: url('./img/users_cover.jpg')">
                        <h3 class="widget-user-username">{{ profileForm.name }}</h3>
                        <h5 class="widget-user-desc">{{ profileForm.bio }}</h5>
                    </div>
                    <div class="widget-user-image">
                        <img class="img-circle" :src="getProfilePhoto()" alt="User Avatar">
                    </div>
                    <div class="card-footer">
                        <div class="row">
                            <div class="col-sm-4 border-right">

                                <div class="description-block">
                                    <h5 class="description-header">0</h5>
                                    <span class="description-text">..</span>
                                </div>
                                <!-- /.description-block -->
                            </div>
                            <!-- /.col -->
                            <div class="col-sm-4 border-right">
                                <div class="description-block">
                                    <h5 class="description-header">0</h5>
                                    <span class="description-text"><i class="fas fa-envelope"></i> Messages</span>
                                </div>
                                <!-- /.description-block -->
                            </div>
                            <!-- /.col -->
                            <div class="col-sm-4">
                                <div class="description-block">
                                    <h5 class="description-header">0</h5>
                                    <span class="description-text">..</span>
                                </div>
                                <!-- /.description-block -->
                            </div>
                            <!-- /.col -->
                        </div>
                        <!-- /.row -->
                    </div>
                </div>
                <!-- /.Widget Card -->


                <div class="card">
                    <div class="card-header p-2">
                        <ul class="nav nav-pills">
                            <li class="nav-item"><a class="nav-link" href="#activity" data-toggle="tab">Activity</a></li>
                            <li class="nav-item"><a class="nav-link" href="#timeline" data-toggle="tab">Timeline</a></li>
                            <li class="nav-item"><a class="nav-link active show" href="#settings" data-toggle="tab">Settings</a></li>
                        </ul>
                    </div><!-- /.card-header -->
                    <div class="card-body">
                        <div class="tab-content">
                            <div class="tab-pane" id="activity">

                            </div>
                            <!-- /.tab-pane -->
                            <div class="tab-pane" id="timeline">
                                <!-- The timeline -->
                                <ul class="timeline timeline-inverse">
                                    <!-- timeline time label -->
                                    <li class="time-label">
                                        <span class="bg-danger">
                                            08 Ott. 2018
                                        </span>
                                    </li>
                                    <!-- /.timeline-label -->
                                    <!-- timeline item -->
                                    <li>
                                        <i class="fa fa-envelope bg-primary"></i>

                                        <div class="timeline-item">
                                            <span class="time"><i class="fa fa-clock-o"></i> 08:30</span>

                                            <h3 class="timeline-header"><a href="#">C&C Group</a> Service Engineer</h3>

                                            <div class="timeline-body">
                                                Etsy doostang zoodles disqus groupon greplin oooj voxy zoodles,
                                                weebly ning heekya handango imeem plugg dopplr jibjab, movity
                                                jajah plickers sifteo edmodo ifttt zimbra. Babblely odeo kaboodle
                                                quora plaxo ideeli hulu weebly balihoo...
                                            </div>
                                            <div class="timeline-footer">
                                                <a href="#" class="btn btn-primary btn-sm">Read more</a>
                                                <a href="#" class="btn btn-danger btn-sm">Delete</a>
                                            </div>
                                        </div>
                                    </li>
                                    <!-- END timeline item -->

                                    <li>
                                        <i class="fa fa-clock-o bg-gray"></i>
                                    </li>
                                </ul>
                            </div>
                            <!-- /.tab-pane -->

                            <div class="tab-pane active show" id="settings">

                                <alert-errors :form="profileForm" message="There were some problems with your input."></alert-errors>

                                <form class="form-horizontal">
                                    <div class="form-group">
                                        <label for="inputName" class="col-sm-2 control-label">Name</label>

                                        <div class="col-sm-10">
                                            <input v-model="profileForm.name" type="text" class="form-control" id="inputName"
                                                placeholder="Name" :class="{ 'is-invalid': profileForm.errors.has('name') }">
                                        </div>
                                        <!-- <has-error :form="profileForm" field="name"></has-error> -->
                                    </div>
                                    <div class="form-group">
                                        <label for="inputRole" class="col-sm-2 control-label">Role</label>

                                        <div class="col-sm-10">
                                            <select v-model="profileForm.role" id="inputRole" name="role" class="form-control"
                                                :class="{ 'is-invalid': profileForm.errors.has('role') }">
                                                <option disabled value="">Select User Role</option>
                                                <option value="admin">Administrator</option>
                                                <option value="user">Standard User</option>
                                                <!--option value="author">Author</option-->
                                            </select>
                                        </div>
                                        <!-- <has-error :form="profileForm" field="role"></has-error> -->
                                    </div>
                                    <div class="form-group">
                                        <label for="inputEmail" class="col-sm-2 control-label">Email</label>
                                        <div class="col-sm-10">
                                            <input v-model="profileForm.email" type="email" class="form-control" id="inputEmail"
                                                placeholder="Email" :class="{ 'is-invalid': profileForm.errors.has('email') }">
                                        </div>
                                        <!-- <has-error :form="profileForm" field="email"></has-error> -->
                                    </div>
                                    <div class="form-group">
                                        <label for="inputBiography" class="col-sm-2 control-label">Biography</label>

                                        <div class="col-sm-10">
                                            <textarea v-model="profileForm.bio" class="form-control" id="inputBiography"
                                                placeholder="Biography" :class="{ 'is-invalid': profileForm.errors.has('bio') }"></textarea>
                                        </div>
                                        <!-- <has-error :form="profileForm" field="bio"></has-error> -->
                                    </div>
                                    <div class="form-group">
                                        <label for="inputPhoto" class="col-sm-10 control-label">Profile Photo (<span
                                                class="red">Max size 2 MB!</span>)</label>

                                        <div class="col-sm-10">

                                            <div class="custom-file">

                                                <input type="file" class="custom-file-input" id="inputPhoto" @change="uploadPhoto"
                                                    :class="{ 'is-invalid': profileForm.errors.has('photo') }" name="profileForm.photo">
                                                <label class="custom-file-label" for="inputPhoto">Choose file</label>
                                            </div>
                                            <!--div class="input-group-append">
                                                <span class="input-group-text" id="">Upload</span>
                                            </div-->
                                            <!-- <has-error :form="profileForm" field="photo"></has-error> -->
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="inputPassword" class="col-sm-10 control-label">Password (leave
                                            empty
                                            if not changing)</label>
                                        <div class="col-sm-10">
                                            <input v-model="profileForm.password" type="password" class="form-control"
                                                id="inputPassword" placeholder="Password" :class="{ 'is-invalid': profileForm.errors.has('password') }">
                                        </div>
                                        <!-- <has-error :form="profileForm" field="password"></has-error> -->
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-offset-2 col-sm-10">
                                            <button @click="updateProfile" type="submit" class="btn btn-success">Update</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <!-- /.tab-pane -->
                        </div>
                        <!-- /.tab-content -->
                    </div><!-- /.card-body -->
                </div>
                <!-- /.nav-tabs-custom -->


            </div>
        </div>
    </div>
</template>

<script src="./profile.js"></script>
