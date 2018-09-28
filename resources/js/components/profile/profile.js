import Axios from "axios";

export default {
    data() {
        return {

            // Create a new form instance
            profileForm: new Form({
                id: '',
                name: '',
                email: '',
                password: '',
                type: '',
                bio: '',
                photo: ''

            })
        }
    },
    methods: {
        getProfilePhoto() {
            return "./img/profiles/" + this.profileForm.photo
        },
        uploadPhoto(event) {
            let file = event.target.files[0];
            console.log(file);
            let reader = new FileReader();
            if (file['size'] < 2097152) {

                reader.onloadend = (file) => {
                    console.log('RESULT: ', reader.result)
                    this.profileForm.photo = reader.result;
                }
                reader.readAsDataURL(file);

            } else {
                swal({
                    type: 'error',
                    title: 'Oops...',
                    text: 'You are uploading a large file!',
                })
            }
        },
        updateProfile() {
            this.$Progress.start();
            this.profileForm.put('api/profile').then((risposta) => {

                toast({
                    type: 'success',
                    title: risposta.data.messageFromLaravel
                })
                this.$Progress.finish();

                // reload page
                Fire.$emit('After_Update_Event');

            }).catch(() => {
                this.$Progress.fail()
            });
        },
        showProfile() {
            Axios.get('api/profile')
                .then(({
                    data
                }) => {
                    (this.profileForm.fill(data))
                });
        }
    },
    mounted() {
        console.log('Component mounted.')
    },
    created() {
        this.showProfile();

        Fire.$on('After_Update_Event', () => {
            this.showProfile();
        });
    }
}
