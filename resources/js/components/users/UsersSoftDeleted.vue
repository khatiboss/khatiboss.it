<template>
    <div class="container">
        <div class="row mt-5">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title"><i class="nav-icon fas fa-users pink"> Users Soft Deleted</i></h3>

                        <div class="card-tools">


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
                                    <th>Deleted at</th>
                                    <th>Actions</th>
                                </tr>
                                <tr v-for="u in users" :key="u.id">
                                    <td><img :src="getUserPhotoPath(u.photo)" alt="" class="img-circle" width="35px"></td>
                                    <td>{{ u.name }}</td>
                                    <td>{{ u.email }}</td>
                                    <td>{{ u.role | upFirstChar}}</td>
                                    <td>{{ u.created_at |dataFormatoItaliano }}</td>
                                    <td>{{ u.deleted_at |dataFormatoItaliano }}</td>
                                    <td>
                                        <a href="" @click="restoreUser(u.id)">
                                            <i class="fa fa-user-check green" title="Restore"></i>
                                        </a>
                                        /
                                        <a href="" @click.prevent="forceDeleteUser(u.id)">
                                            <!-- <i class="fa fa-trash red" title="Delete"></i> -->
                                            <i class="fas fa-trash red" title="Force Delete"></i>
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

    </div>

    <!-- Do Not put the Modal here because It should be one child (ONE DIV CONTAINS ALL ELEMENTS) in a component represented by template-->
</template>

<script src="./usersSoftDeleted.js"></script>
