<template>
  <v-dialog v-model="isVisible" max-width="500">
    <v-card>
      <v-card-title>
        <span class="headline">Stok {{ processType === 2 ? 'Güncelle' : 'Ekle' }}</span>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="StockInfo.Name"
          label="Stok Adı"
          required
        />
        <v-text-field
          v-model="StockInfo.UnitCode"
          label="Satıcı Kodu"
          required
        />
        <v-text-field
          v-model="StockInfo.UnitName"
          label="Birim Adı"
          required
        />
        <v-text-field
          v-model="StockInfo.Price"
          label="Fiyat"
          type="number"
          required
        />
        <v-text-field
          v-model="StockInfo.TaxPercent"
          label="KDV (%)"
          type="number"
          required
        />
        <v-checkbox
          v-model="StockInfo.IsActive"
          label="Aktif"
        />
      </v-card-text>
    
      <v-card-actions>
        <v-btn color="blue darken-1" text @click="closeDialog">İptal</v-btn>
        <v-btn color="blue darken-1" text @click="saveStock" >Kaydet</v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
  <v-snackbar
  v-model="snackbar"
  :timeout="timeout"
  color="green"
>
  {{ text }}
  </v-snackbar>
</template>

<script>
import { ref, toRefs, onMounted } from 'vue';

export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    stockList: {
      type: Array,
      default: () => []
    },
    editingStock: {
      type: Object,
      required: false
    },
    processType: {
      type: Number
    }
  },
  setup(props, { emit }) {
    const { isVisible, stockList, processType, editingStock } = toRefs(props);
    const StockInfo = ref({
      Name: '',
      UnitCode: '',
      UnitName: '',
      Price: 0,
      TaxPercent: 0,
      IsActive: true
    });

    const snackbar = ref(false);
    const timeout=ref(1000);
    const text=ref("Başarılı!")

    
    onMounted(() => {
      
      if (processType.value === 2) {
        StockInfo.value = editingStock.value ;
        
      }
    });

    const closeDialog = () => {
      emit('update:isVisible', false); 
    };

    const saveStock = () => {
      if (processType.value === 1) {
        stockList.value.push(StockInfo.value); 
        snackbar.value = true;
      } else if (processType.value === 2) {
        
        const index = stockList.value.findIndex(item => item.id === editingStock.value.id);
        if (index !== -1) {
          stockList.value[index] = { ...StockInfo.value };
          snackbar.value = true;
        }
      }
      setTimeout(()=>{
        emit('update:isVisible', false); 

      },2000)
    };

    return {
      isVisible,
      StockInfo,
      closeDialog,
      saveStock,
      snackbar,
      timeout,
      text
    };
  }
};
</script>

