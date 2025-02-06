package com.spring.SpringbootProject.Service;

import com.spring.SpringbootProject.Repository.MalzemeHareketRepository;
import com.spring.SpringbootProject.Table.Malzeme;
import com.spring.SpringbootProject.Table.MalzemeHareket;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import redis.clients.jedis.Jedis;

import java.util.List;

@Service
public class MalzemeHareketService {

    Jedis jedis = new Jedis("localhost" , 6380);


    @Autowired
    private MalzemeHareketRepository mlzHareketRp;

    public List<MalzemeHareket> getAll() {
        return mlzHareketRp.getAll();
    }

    public List<String> save(MalzemeHareket movement,String token) {
        String[] values = token.split(" ");
        String email = values[0];
        String tokenValue = values[1];
        System.out.println("Token ==> " + token);
        System.out.println("Email ==> " + email);
        System.out.println("Token Value ==> " + tokenValue);
        String originalToken = jedis.get(email);
        System.out.println("Original Token ==> " + originalToken);
        System.out.println("Jedis Get ==> " + jedis.get(email));
        System.out.println("Original token ==> " + originalToken);

        if (values.length < 2) {
            System.out.println("Token formatı hatalı: Yeterli eleman yok.");
            return null;
        }

        if (originalToken == null) {
            System.out.println("Redis'te anahtar bulunamadı.");
            return null;
        }
        // Token değerini kontrol edin
        if (!originalToken.equals(tokenValue)) {
            return null;
        }
        return mlzHareketRp.save(movement);
    }

    public List<String> update(MalzemeHareket movement, int id,String token) {
        String[] values = token.split(" ");
        String email = values[0];
        String tokenValue = values[1];
        System.out.println("Token ==> " + token);
        System.out.println("Email ==> " + email);
        System.out.println("Token Value ==> " + tokenValue);
        String originalToken = jedis.get(email);
        System.out.println("Original Token ==> " + originalToken);
        System.out.println("Jedis Get ==> " + jedis.get(email));
        System.out.println("Original token ==> " + originalToken);

        if (values.length < 2) {
            System.out.println("Token formatı hatalı: Yeterli eleman yok.");
            return null;
        }

        if (originalToken == null) {
            System.out.println("Redis'te anahtar bulunamadı.");
            return null;
        }
        // Token değerini kontrol edin
        if (!originalToken.equals(tokenValue)) {
            return null;
        }
        return mlzHareketRp.update(id,movement);
    }

    public List<String> delete(int id,String token) {
        String[] values = token.split(" ");
        String email = values[0];
        String tokenValue = values[1];
        System.out.println("Token ==> " + token);
        System.out.println("Email ==> " + email);
        System.out.println("Token Value ==> " + tokenValue);
        String originalToken = jedis.get(email);
        System.out.println("Original Token ==> " + originalToken);
        System.out.println("Jedis Get ==> " + jedis.get(email));
        System.out.println("Original token ==> " + originalToken);

        if (values.length < 2) {
            System.out.println("Token formatı hatalı: Yeterli eleman yok.");
            return null;
        }

        if (originalToken == null) {
            System.out.println("Redis'te anahtar bulunamadı.");
            return null;
        }
        // Token değerini kontrol edin
        if (!originalToken.equals(tokenValue)) {
            return null;
        }
        return mlzHareketRp.delete(id);
    }

    public List<String> deleteAll(int[] id,String token) {
        String[] values = token.split(" ");
        String email = values[0];
        String tokenValue = values[1];
        System.out.println("Token ==> " + token);
        System.out.println("Email ==> " + email);
        System.out.println("Token Value ==> " + tokenValue);
        String originalToken = jedis.get(email);
        System.out.println("Original Token ==> " + originalToken);
        System.out.println("Jedis Get ==> " + jedis.get(email));
        System.out.println("Original token ==> " + originalToken);

        if (values.length < 2) {
            System.out.println("Token formatı hatalı: Yeterli eleman yok.");
            return null;
        }

        if (originalToken == null) {
            System.out.println("Redis'te anahtar bulunamadı.");
            return null;
        }
        // Token değerini kontrol edin
        if (!originalToken.equals(tokenValue)) {
            return null;
        }
        return mlzHareketRp.deleteAll(id);
    }


}
