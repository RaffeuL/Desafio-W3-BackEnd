import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import GiftCard from "App/Models/GiftCard";

export default class extends BaseSeeder {
  public async run() {
    await GiftCard.createMany([
      {
        gift_card_type_id: 1,
        name: "VIVO",
      },
      {
        gift_card_type_id: 1,
        name: "CLARO",
      },
      {
        gift_card_type_id: 1,
        name: "TIM",
      },
      {
        gift_card_type_id: 1,
        name: "OI",
      },
      {
        gift_card_type_id: 2,
        name: "NETFLIX",
      },
      {
        gift_card_type_id: 2,
        name: "PRIME VIDEO",
      },
      {
        gift_card_type_id: 2,
        name: "DISNEY",
      },
      {
        gift_card_type_id: 2,
        name: "HBO MAX",
      },
      {
        gift_card_type_id: 3,
        name: "XBOX",
      },
      {
        gift_card_type_id: 3,
        name: "NINTENDO",
      },
      {
        gift_card_type_id: 3,
        name: "STEAM",
      },
    ]);
  }
}
