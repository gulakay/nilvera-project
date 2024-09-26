<template>
    <v-dialog v-model="isVisible" max-width="500">
      <v-card>
        <v-card-title>
          <span class="text-h5">Müşteri {{ processType === 2 ? 'Güncelle' : 'Ekle' }}</span>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="CustomerInfo.Name" label="Firma Adı"></v-text-field>
          <v-text-field v-model="CustomerInfo.ID" label="VKN/TCKN"></v-text-field>
          <v-text-field v-model="CustomerInfo.TaxDepartment" label="Vergi Dairesi"></v-text-field>
          <v-text-field v-model="CustomerInfo.Phone" label="İletişim"></v-text-field>
          <v-text-field v-model="CustomerInfo.City" label="Şehir"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="closeDialog">İptal</v-btn>
          <v-btn color="blue darken-1" text @click="saveCustomer">Kaydet</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
  v-model="snackbar"
  :timeout="timeout"
>
  {{ text }}
  </v-snackbar>

  </template>
  
  <script>
  import { ref, defineComponent, toRefs, onMounted } from 'vue';
  
  export default defineComponent({
    props: {
      isVisible: {
        type: Boolean,
        required: true,
      },
      customerList: {
      type: Array,
      default: () => []
    },
    editingCustomer: {
        type: Object,
        required: true,
      },
      processType: {
      type: Number
    }
    },
    setup(props, { emit }) {
      const { isVisible, customerList, processType, editingCustomer } = toRefs(props);
      const CustomerInfo =ref({
        Name: '',
        ID: '',
        TaxDepartment: '',
        Phone: '',
        City: '',
      });

      const snackbar = ref(false);
    const timeout=ref(1000);
    const text=ref("Başarılı!");

      onMounted(() => {
      if (processType.value === 2) {
        CustomerInfo.value = editingCustomer.value ;
      }
    });
      const closeDialog = () => {
      emit('update:isVisible', false); 
    };

    const saveCustomer = () => {
      if (processType.value === 1) {
        customerList.value.push(CustomerInfo.value);
        snackbar.value = true; 
      } else if (processType.value === 2) {
      
        const index = customerList.value.findIndex(item => item.id === editingCustomer.value.id);
        if (index !== -1) {
          customerList.value[index] = { ...CustomerInfo.value };
          snackbar.value = true;
        }
      }
      setTimeout(()=>{
        emit('update:isVisible', false); 

      },2000)
    };
      return {
        isVisible,
        CustomerInfo,
        snackbar,
        text,
        timeout,
       closeDialog,
       saveCustomer
      };
    },
  });
  </script>
  
