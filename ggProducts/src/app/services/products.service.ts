import { Injectable } from '@angular/core';
import { Product } from '../home/product';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products: Product[] = [
    {
      name: 'Premium Bluetooth Smart Scale' ,
      code: '0376' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation66vgimV34M0soEXEn3f0OG.jpg' ,
      category: 'Fitness'
    },
    {
      name: 'Bluetooth Body Composition Scale' ,
      code: '0383' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation7uiZ1dCUfDwpUbB3AopimY.jpg' ,
      category: 'Fitness'
    },
    {
      name: 'Bluetooth Body Composition Scale' ,
      code: '0379' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation1s1ADLXEyYKt22S5DEvmUW.jpg' ,
      category: 'Fitness'
    },
    {
      name: 'Wi-Fi Smart Scale' ,
      code: '0385' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation58ZvxyphhXANGMTmBiXvCv.jpg' ,
      category: 'Fitness'
    },
    {
      name: 'Bluetooth Smart Scale' ,
      code: '0382' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation2FyyrbMHZOQOhlZ4DzeJy1.jpg' ,
      category: 'Fitness'
    },
    {
      name: 'Body Composition Scale' ,
      code: '0343' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation0rHMleIaqMUnjKspBRH4nA.jpg' ,
      category: 'Fitness' ,
    },
    {
      name: 'Smart Bathroom Scale (Bed, Bath, & Beyond)' ,
      code: '0380',
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation5hrnoCh3a3mFAtdoL64QLL.jpg' ,
      category: 'Fitness' ,
    },
    {
      name: 'Smart Bathroom Scale' ,
      code: '0378' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation100FPN94LgGYOoqcj3q61z.jpg' ,
      category: 'Fitness' ,
    },
    {
      name: 'Premium Wi-Fi Scale V.2' ,
      code: '0397' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation/0uWyFjkILPPDhgdqbzm2eY.jpg' ,
      category: 'Fitness' ,
    },
    {
      name: 'Premium Wi-Fi Scale V.1' ,
      code: '0396' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation6SPhQBhFpGaGtX2HUPbuXz.jpg' ,
      category: 'Fitness' ,
    },
    {
      name: 'Resistance Bands' ,
      code: '0835' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation/7vGhpk1TG5kFKN4rlEZNPM.jpg' ,
      category: 'Fitness' ,
    },
    {
      name: 'Wi-Fi Scale' ,
      code: '0384' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation/0yBIvoVdwNMLiJaOryGvE0.jpg' ,
      category: 'Fitness' ,
    },
    {
      name: 'Designer Bluetooth Smart Scale' ,
      code: '0375' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation1EiJajtu86uGMelGPZbDw6.jpg' ,
      category: 'Fitness' ,
    },
    {
      name: 'Wrist Blood Pressure Monitor' ,
      code: '0607' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation06R7xCRk4cfJSeucLnN1oc.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'Smart Blood Pressure Monitor' ,
      code: '0604' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation1nhvsWhZd2B5Ty86udS0le.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'Blood Pressure Monitor + Kit' ,
      code: '0602' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation/6OcYt5d9exGRAddrvzPaZa.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'Bathroom Scale' ,
      code: '0392' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation1fJxM6HMfP65CFFh4xG8mn.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'Sphygmomanometer' ,
      code: '0610' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation5NQjyUSIm0YPEICuZJl2uk.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'AccuCheck Bathroom Scale' ,
      code: '0327' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation/2qQO1YuaETwvlhd2LRMKcg.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'Stainless Steel Stethoscope' ,
      code: '0609' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation0kJOuZh3Pu1yUXx8THXyxr.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'Sonic Electric Toothbrush' ,
      code: '0624' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation679VYLyEHfPJF8HzqTO6PW.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'Live Thoughtfully T-Shirt' ,
      code: '0917' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation6K5bm5QDGr1f9yZQL3zK2i.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'Blood Pressure Monitor' ,
      code: '0662' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation/3gR7kJtSTbBxvtkBlYXf4E.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'Body Composition Scale' ,
      code: '0386' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation1kJgIBSN9rAXbywdn5PAWY.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'Bluetooth Blood Pressure Monitor + Kit' ,
      code: '0664' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation2saxzop2oKURQGCPhI1hrE.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'Baby Scale' ,
      code: '0221' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation/2zoT9WEXXIwkjLfzObftZ1.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'AccuCheck Bathroom Scale' ,
      code: '0394' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation4ttia9XBnz0kV3RKAYrVZ4.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'Smart Pro-Series Blood Pressure Monitor' ,
      code: '0634' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation2awQbpmmkkat6F4Svxr3TJ.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'Body Composition Scale' ,
      code: '0373' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation4c8IXlo8bw7gOiF4ondOc3.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'All-In-One Bluetooth Blood Pressure Monitor' ,
      code: '0636' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation4WajRXe5qL3IpUTjMsH1RL.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'Stainless Steel Stethoscope (Dual Heads)' ,
      code: '0613' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation2VBGQdKHbTNwo5TI6WdYns.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'Silicone Bathroom Scale (Target, Grey)' ,
      code: '0398' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation0cXwGpFgYQWAvLuQgvZ5g3.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'Pro-Series Blood Pressure Monitor' ,
      code: '0632' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation2w8nAjIVGyMRgsPqX52aMl.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'Smart Wrist Blood Pressure Monitor' ,
      code: '0603' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation/16pty0TNxnO6Nxq2YSdX1y.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'Bathroom Scale' ,
      code: '0372' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation4M8N80MCbBX49dYxXdWDQV.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'Bathroom Scale' ,
      code: '0387' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation2GzQ8nbHNyWUf2ZXWIcV3H.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'Greater Goods Dual-Head Stethoscope' ,
      code: '0620' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation/6sAIrBvxGpY6B60TzMDpxe.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'Smart Baby Scale' ,
      code: '0220' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation4JBnqi0UIXGudhQD35gcoq.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'Stethoscope (Dual Heads)' ,
      code: '0612' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation3rKwRlYu8aS7tcbbOdpO2p.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'Sonic Electric Toothbrush (And Replacement Heads)' ,
      code: '0627' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation7ItTOKJyNJXzIabb5UpHn6.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'High Capacity Body Comp Scale' ,
      code: '0402' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation/5auYmTtd8qIN5xN2ut2TtT.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'Bathroom Scale' ,
      code: '0390' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation2cif1a9m8eU35ZnOJhMmul.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'Body Composition Scale ' ,
      code: '0399' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation532TJgitHOwbSiBnhOQHXt.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'Pet Scale' ,
      code: '0250' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation/6KRGkywZoGEoprjgltS6Hw.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'Silicone Bathroom Scale' ,
      code: '0405' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation7u5V2ocbElic8x0ba9OrRT.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'Pro-Series Blood Pressure Monitor' ,
      code: '0632' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation2w8nAjIVGyMRgsPqX52aMl.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'Smart Wrist Blood Pressure Monitor' ,
      code: '0603' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation/16pty0TNxnO6Nxq2YSdX1y.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'Sonic Electric Toothbrush (And Replacement Heads)' ,
      code: '0628' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation68PoZAWw5NEq8nWkYyRQmg.jpg' ,
      category: 'health and wellness' ,
    },

    {
      name: 'Silicone Bathroom Scale' ,
      code: '0408' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation04ohuJi2IDdvdQl1bRHOnH.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'High Capacity Bathroom Scale' ,
      code: '0401' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation/5sdmSBvwepWgOj4UrRmXbO.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'Classic Wrist Blood Pressure Monitor' ,
      code: '0605' ,
      imgSrc: 'https://media.greatergoods.com/images/original/aj8moln2nz.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'Pulse Oximeter' ,
      code: '0680' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation/1uxif51dBFlJfE4KXsKBQn.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'Balance Disc' ,
      code: '0838' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation/6j5LYsYAqMppzk3SGzrL18.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: '55cm Yoga Ball' ,
      code: '0800' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation/3kM48XMo0vxj3zFZe91Umu.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: '75cm Yoga Ball' ,
      code: '0816' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation/2yxvmpXh58nRQcAmn2rdyW.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'Oral Thermometer' ,
      code: '0690' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation/3X5pgNmVSSva2hR4Q9X1FZ.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'Yoga Blocks' ,
      code: '0852' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation/7whUWqQkczzS0FiWdFBhGJ.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: '65cm Yoga Ball' ,
      code: '0811' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation/5kgOhSJpG7PsL5BtIR2p31.jpg' ,
      category: 'health and wellness',
    },
    {
      name: 'Yoga Mat' ,
      code: '0842' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation/1JtuKWpvXdoxdgJRfzwp3N.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'AccuCheck Scale' ,
      code: '0374' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation/3jR0IrKaRecSB5rivtZVGS.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'AccuCheck Scale (Black)' ,
      code: '0377' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation/7LNXMFEbUsrsLsB8h3de0W.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'Silicone Scale' ,
      code: '0411' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation/1eIIxhgLssyAdMAapufUkk.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: 'Body Composition Scale' ,
      code: '0391' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation4blpELsitgCH0mfMYG1v3d.jpg' ,
      category: 'health and wellness' ,
    },
    {
      name: '0.1 Gram Digital Pocket Scale' ,
      code: '0483' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation/2R2zoOWkyaIYxiLhT6qGwX.jpg' ,
      category: 'Kitchen and home' ,
    },
    {
      name: 'Ten Inch Cast Iron Skillet' ,
      code: '0500' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation4LROYzT8agSUM3j0As1gjf.jpg' ,
      category: 'Kitchen and home' ,
    },
    {
      name: '0.01 Gram Digital Pocket Scale' ,
      code: '0489' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation/4cywKWtlPkMZ4zFRBx0Vny.jpg' ,
      category: 'Kitchen and home' ,
    },
    {
      name: 'Food Thermometer' ,
      code: '0490' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation4MJXuIBZc8vIIQ2WG80luI.jpg' ,
      category: 'Kitchen and home' ,
    },
    {
      name: 'Designer Chef\'s Knives',
      code: '0555' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation0rzrf0CicjOG755VzovuKb.jpg' ,
      category: 'Kitchen and home' ,
    },
    {
      name: 'Chef\'s Knife' ,
      code: '0550' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation74QjaB9Ocbe0PY5VAIIiw3.jpg' ,
      category: 'Kitchen and home' ,
    },
    {
      name: 'Digital Luggage Scale' ,
      code: '0484' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation08NLzaC5n3NJnkdZ1zEzzi.jpg' ,
      category: 'Kitchen and home' ,
    },
    {
      name: 'Stainless Steel Food Scale' ,
      code: '0470' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation/3a7BvHY7K7C3P1C6JSzkpw.jpg' ,
      category: 'Kitchen and home' ,
    },
    {
      name: 'Twelve Inch Cast Iron Skillet' ,
      code: '0504' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation/0FKPKHkYiYfPVqC7Jy5FyN.jpg' ,
      category: 'Kitchen and home' ,
    },
    {
      name: 'Ten Inch Cast Iron Griddle' ,
      code: '0503' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation/3v5BELZkXTdpzRk0G7fGrR.jpg' ,
      category: 'Kitchen and home' ,
    },
    {
      name: 'Kitchen Scale' ,
      code: '0468' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation5CsdHMs2toDq3m8GMCKhao.jpg' ,
      category: 'Kitchen and home' ,
    },
    {
      name: 'Silicone Ice Tray + Lid' ,
      code: '0521' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation2n7aFXQQNee60iIyDRxtEj.jpg' ,
      category: 'Kitchen and home' ,
    },
    {
      name: 'Five Quart Cast Iron Dutch Oven' ,
      code: '0501' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation/6bR7KMfqNQkWstNquHIkHy.jpg' ,
      category: 'Kitchen and home' ,
    },
    {
      name: 'Chainmail Scrubber for Cast Iron' ,
      code: '0511' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation3Gr4wOFIAYw44h33u3uiws.jpg' ,
      category: 'Kitchen and home' ,
    },
    {
      name: 'Sous Vide' ,
      code: '0535' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation/2X3fUOdnFU8SoKoaQyRPrH.jpg' ,
      category: 'Kitchen and home' ,
    },
    {
      name: 'Cast Iron Lid' ,
      code: '0502' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation7iJtiekBEKRLkJBUOlJl2P.jpg' ,
      category: 'Kitchen and home' ,
    },
    {
      name: 'Reusable PEVA Food Bags' ,
      code: '0561' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation/4f6IaaF8RxfZp9ZjvWwq94.jpg' ,
      category: 'Kitchen and home' ,
    },
    {
      name: 'Kitchen Scale (Bed, Bath, & Beyond)' ,
      code: '0475' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation3IUFhjnHrbUPC2JgHOVtQz.jpg' ,
      category: 'Kitchen and home' ,
    },
    {
      name: 'Kitchen Scale' ,
      code: '0455' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation/4uU6ZhbmUNlXRg4Llixyjr.jpg' ,
      category: 'Kitchen and home' ,
    },
    {
      name: 'Silicone Cover for Cast Iron' ,
      code: '0510' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation7lJSPRzhRjlaD4xPuv9tw7.jpg' ,
      category: 'Kitchen and home' ,
    },
    {
      name: 'Single Sensor Baking Scale' ,
      code: '0485' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation/7y9z7sRTIGqXLLcZRvXhhq.jpg' ,
      category: 'Kitchen and home' ,
    },
    {
      name: 'Precision Kitchen Scale' ,
      code: '0482' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation3LNCxjV9j9vfX0TZZVwyVK.jpg' ,
      category: 'Kitchen and home' ,
    },
    {
      name: 'Premium Coffee Scale' ,
      code: '0460' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation/2KBhxpRyHPyZtsC8CavyOn.jpg' ,
      category: 'Kitchen and home' ,
    },
    {
      name: 'Organic Flax Seed Oil' ,
      code: '0520' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation3BUG4TIfssmMy1yTnZy1lP.jpg' ,
      category: 'Kitchen and home' ,
    },
    {
      name: 'Nutrition Facts Food Scale' ,
      code: '0451' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation5G9EVn6GeW9PZvuy3Ue7Oe.jpg' ,
      category: 'Kitchen and home' ,
    },
    {
      name: 'Black Kitchen Scale with Bowl' ,
      code: '0486' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation/2q3cqzJBKpz3yfSxmEmV3w.jpg' ,
      category: 'Kitchen and home' ,
    },
    {
      name: 'Nutrition Facts Food Scale (Bed, Bath, & Beyond)' ,
      code: '0450' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation1Vth6CFI0ZhIzycKzxdQ76.jpg' ,
      category: 'Kitchen and home' ,
    },
    {
      name: 'High Capacity Kitchen Scale' ,
      code: '0471' ,
      imgSrc: 'https://s3.amazonaws.com/gg-mark/gsg/variation/67xFidS6mwb7UZevOyd62I.jpg' ,
      category: 'Kitchen and home' ,
    },
  ];

  constructor() { }

  getAllProducts() {
    return [...this.products];
  }

}
