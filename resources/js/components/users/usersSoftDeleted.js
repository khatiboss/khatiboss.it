import Axios from "axios";
export default {
    data() {
        return {
            pathUserPhoto: './img/profiles/',
            users: {},
            // Create a new form instance
            userForm: new Form({
                id: '',
                name: '',
                email: '',
                password: '',
                role: '',
                bio: '',
                photo: ''

            })
        }
    },
    methods: {
        getUserPhotoPath(foto) {
            return this.pathUserPhoto + foto;
        },
        forceDeleteUser(userId) {
            swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {

                //console.log(result);
                if (result.value) {
                    // sending delete request to the server
                    this.userForm.delete('api/deleteUserPermanently/' + userId).then((risposta) => {
                        //console.log(risposta.data.messageFromLaravel);
                        swal(
                            'Deleted!',
                            risposta.data.messageFromLaravel,
                            'success'
                        )
                        // reload page
                        Fire.$emit('After_CRUD_Operation_Event');
                    }).catch(() => {
                        swal({
                            type: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                        })

                    });
                } else {
                    console.log(result.dismiss);
                }

            })
        },
        loadSoftDeletedUsers() {

            Axios.get('api/softUsers').then(
                ({
                    data
                }) => (this.users = data));

        },
        restoreUser(userId) {
            this.$Progress.start();
            this.userForm.put('api/restoreUser/' + userId).then((risposta) => {
                toast({
                    type: 'success',
                    title: risposta.data.messageFromLaravel
                });
                // reload page
                Fire.$emit('After_CRUD_Operation_Event');

                this.$Progress.finish();
            }).catch(() => {
                this.$Progress.fail()
            });
        }
    },
    mounted() {
        console.log('Component mounted.')
    },
    created() {
        //On loading/efresh a page
        this.loadSoftDeletedUsers();

        Fire.$on('After_CRUD_Operation_Event', () => {
            this.loadSoftDeletedUsers();
        });

        //3rd - It can call method with pusher (pusher.com)
    }
}
