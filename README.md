Start file-manager
```
npm run start -- --username=your_username
```
Stop file-manager
```
ctrl + c

.exit
```
Navigation & working directory (nwd)

-   Go upper from current directory:
```
up
```
-   Go to dedicated folder from current directory (`path_to_directory`  can be relative or absolute):
```
cd path_to_directory
```
-   Print in console list of all files and folders in current directory:
```
ls
```
Basic operations with files:

-   Read file and print it's content in console
```
cat path_to_file
``` 
-   Create empty file in current working directory:
```    
add new_file_name
```   
-   Rename file:
```    
rn path_to_file new_filename
```    
-   Copy file (`path_to_file` and `path_to_new_directory` shouldn't contain white spaces !!!):
```    
cp path_to_file path_to_new_directory
```    
-   Move file (`path_to_file` and `path_to_new_directory` shouldn't contain white spaces !!!):
```    
mv path_to_file path_to_new_directory
```    
-   Delete file:
```    
rm path_to_file
```
Operating system info (prints following information in console)

-   Get EOL:
```    
os --EOL
```    
-   Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them):
```    
os --cpus
```    
-   Get home directory:
```    
os --homedir
```    
-   Get current  _system user name_:
```    
os --username
```    
-   Get CPU architecture for which Node.js binary has compiled:
```    
os --architecture
```    
Hash calculation

-   Calculate hash for file:
```    
hash path_to_file
```    
Compress and decompress operations

-   Compress file (using Brotli algorithm) (`path_to_file` and `path_to_destination` shouldn't contain white spaces !!!)::
```    
compress path_to_file path_to_destination
```    
-   Decompress file (using Brotli algorithm) (`path_to_file` and `path_to_destination` shouldn't contain white spaces !!!)::
```    
decompress path_to_file path_to_destination
```

