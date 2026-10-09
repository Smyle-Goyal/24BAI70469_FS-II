public class StringPractice {
    public static void main(String[] args){
        String str1 = "Hello";
        String str2 = " World";
        String str3 = str1.concat(str2);
        System.out.println("Concatenated String: " + str3);
        System.out.println("Direct concatenation: " + str1.concat(str2));

        StringBuilder sb = new StringBuilder("Hello");
        sb.append(" World");
        System.out.println("StringBuilder: " + sb.toString());
    }
}
