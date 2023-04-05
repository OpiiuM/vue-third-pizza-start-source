import { AddressResource } from './address.resource';
import { AuthService } from './auth.service';
import { DoughResource } from './dough.resource';
import { IngredientResource } from './ingredient.resource';
import { MiscResource } from './misc.resource';
import { OrderResource } from './order.resource';
import { SauceResource } from './sauce.resource';
import { SizeResource } from './size.resource';

export default {
  address: new AddressResource(),
  auth: new AuthService(),
  dough: new DoughResource(),
  ingredient: new IngredientResource(),
  misc: new MiscResource(),
  order: new OrderResource(),
  sauce: new SauceResource(),
  size: new SizeResource(),
};
