<template>
    <div class="container">
        <div class="row mt-5">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title"><i class="nav-icon fas fa-users indigo"> Users List</i></h3>

                        <div class="card-tools">
                            <!-- Button trigger modal -->
                            <!--button type="button" class="btn btn-success" data-toggle="modal" data-target="#userModalCenter"-->
                            <button type="button" class="btn btn-success" @click="newUserModal">
                                Add New<i class="fas fa-user-plus" title="Add User"></i></button>

                        </div>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body table-responsive p-0">
                        <table class="table table-hover">
                            <tbody>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Registered at</th>
                                    <th>Actions</th>
                                </tr>
                                <tr v-for="u in users" :key="u.id">
                                    <td><img :src="getUserPhotoPath(u.photo)" alt="" class="img-circle" width="35px"></td>
                                    <td>{{ u.name }}</td>
                                    <td>{{ u.email }}</td>
                                    <td>{{ u.role | upFirstChar}}</td>
                                    <td>{{ u.created_at |dataFormatoItaliano }}</td>
                                    <td>
                                        <a href="#" @click="editUserModal(u)">
                                            <i class="fa fa-edit" title="Edit"></i>
                                        </a>
                                        /
                                        <a href="" @click.prevent="deleteUser(u.id)">
                                            <!-- <i class="fa fa-trash red" title="Delete"></i> -->
                                            <i class="fas fa-user-times pink" title="Soft Delete"></i>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- /.card-body -->
                </div>
                <!-- /.card -->
            </div>
        </div>


        <!-- Modal -->
        <div class="modal fade" id="userModalCenter" tabindex="-1" role="dialog" aria-labelledby="userModalCenterTitle"
            aria-hidden="false">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 v-show="!editMode" class="modal-title green" id="userModalCenterTitle">Add New</h5>
                        <h5 v-show="editMode" class="modal-title green" id="userModalCenterTitle">Update User's Info</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <!-- Show a danger alert with the list of errors for each field. -->
                    <!-- <alert-errors :form="userForm" message="There were some problems with your input."></alert-errors> -->

                    <form @submit.prevent="editMode ? updateUser() : createUser()">
                        <div class="modal-body">
                            <div class="form-group">
                                <input v-model="userForm.name" type="text" placeholder="Name" id="name" name="name"
                                    class="form-control" :class="{ 'is-invalid': userForm.errors.has('name') }">
                                <has-error :form="userForm" field="name"></has-error>
                            </div>
                            <div class="form-group">
                                <input v-model="userForm.email" type="email" placeholder="Email Address" id="email"
                                    name="email" class="form-control" :class="{ 'is-invalid': userForm.errors.has('email') }">
                                <has-error :form="userForm" field="email"></has-error>
                            </div>
                            <div class="form-group">
                                <span v-show="editMode" class="orange">(leave empty if not changing)</span>
                                <input v-model="userForm.password" placeholder="Password"
                                    type="password" id="password" name="password" class="form-control" :class="{ 'is-invalid': userForm.errors.has('password') }">
                                <has-error :form="userForm" field="password"></has-error>
                            </div>
                            <div class="form-group">
                                <select v-model="userForm.role" id="role" name="role" class="form-control" :class="{ 'is-invalid': userForm.errors.has('role') }">
                                    <option disabled value="">Select User Role</option>
                                    <option value="admin">Administrator</option>
                                    <option value="user">Standard User</option>
                                    <!--option value="author">Author</option-->
                                </select>
                                <has-error :form="userForm" field="role"></has-error>
                            </div>
                            <div class="form-group">
                                <textarea v-model="userForm.bio" placeholder="Short Bio for user (Optional)" id="bio"
                                    name="bio" class="form-control" :class="{ 'is-invalid': userForm.errors.has('bio') }"></textarea>
                                <has-error :form="userForm" field="bio"></has-error>
                            </div>
                            <div class="form-group">
                                <div class="custom-file">
                                    <input type="file" :class="{ 'is-invalid': userForm.errors.has('photo') }" class="custom-file-input"
                                        id="inputPhoto" @change="uploadPhoto">
                                    <label class="custom-file-label" for="photo">Choose file (<span class="red">Max
                                            size 2 MB!</span> )</label>
                                </div>
                                <has-error :form="userForm" field="photo"></has-error>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="reset" class="btn btn-danger" data-dismiss="modal">Close</button>
                            <button v-show="!editMode" type="submit" class="btn btn-primary">Create</button>
                            <button v-show="editMode" type="submit" class="btn btn-success">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- /.Modal -->
    </div>

    <!-- Do Not put the Modal here because It should be one child (ONE DIV CONTAINS ALL ELEMENTS) in a component represented by template-->
</template>

<script src="./users.js"></script>
