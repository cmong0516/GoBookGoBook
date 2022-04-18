package apitest.study.domain;

import lombok.Data;

import javax.persistence.*;
import javax.persistence.Id;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId;
    private String userPw;
    private String userName;
    private String userEmail;
    private boolean enabled;

    @ManyToMany
    @JoinTable(
            name = "user_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name="role_id")
    )

    private List<Role> roles = new ArrayList<>();
    //상태엔터티 추가 예정

    /*Mapping 종류
    * @OndToOne: user - user_detail
    * @OneToMany: user - board
    * @ManyToOne: board - user
    * @ManyToMany: user - role
    * */
}
