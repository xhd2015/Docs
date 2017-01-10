----------------------------------------------------------------------------------
-- Company: 
-- Engineer: 
-- 
-- Create Date:    10:12:15 07/23/2016 
-- Design Name: 
-- Module Name:    ALU - Behavioral 
-- Project Name: 
-- Target Devices: 
-- Tool versions: 
-- Description: 
--
-- Dependencies: 
--
-- Revision: 
-- Revision 0.01 - File Created
-- Additional Comments: 
--
----------------------------------------------------------------------------------
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.STD_LOGIC_UNSIGNED.ALL;
use IEEE.std_logic_arith.all;

-- Uncomment the following library declaration if using
-- arithmetic functions with Signed or Unsigned values
--use IEEE.NUMERIC_STD.ALL;

-- Uncomment the following library declaration if instantiating
-- any Xilinx primitives in this code.
--library UNISIM;
--use UNISIM.VComponents.all;

entity ALU is
	port(
	cs:in std_logic;
	cs_stor:in std_logic;
	cs_writ:in std_logic;
	ir_in:in std_logic_vector(15 downto 0);
	reset:in std_logic;
	reg_update:in std_logic;
	reg_up_data:in std_logic_vector(7 downto 0);
	
	ctrl_ifwrite,ctrl_ifpc,ctrl_ifextern,ctrl_ifio,ctrl_ifread:out std_logic;
	
	m_addr:out std_logic_vector(15 downto 0);
	m_data:out std_logic_vector(7 downto 0);
	
	alu_out:out std_logic_vector(15 downto 0)
	);
end ALU;

architecture Behavioral of ALU is
type reg_size is array(7 downto 0) of std_logic_vector(7 downto 0);
signal regarr:reg_size;
signal regindex:std_logic_vector(2 downto 0);
signal alures:std_logic_vector(15 downto 0);
signal ir_temp:std_logic_vector(15 downto 0);

begin
	

	
	ir_temp<=ir_in;
	alu_out<=alures;
	
	
	process(reset,cs,reg_update,reg_up_data) --回写寄存器
	begin
		if reset='1' then
			regarr(0)(7 downto 0)<=(others=>'0');
			regarr(1)(7 downto 0)<=(others=>'0');
			regarr(2)(7 downto 0)<=(others=>'0');
			regarr(3)(7 downto 0)<=(others=>'0');
			regarr(4)(7 downto 0)<=(others=>'0');
			regarr(5)(7 downto 0)<=(others=>'0');
			regarr(6)(7 downto 0)<=(others=>'0');
			regarr(7)(7 downto 0)<=(others=>'0');
		elsif cs='0' and reg_update='1' then
			regarr(conv_integer(regindex))<=reg_up_data;
		end if;
	end process;
	
	process(reset,cs)--输出控制信号
	begin
		if reset='1'  then
			ctrl_ifwrite<='0';ctrl_ifpc<='0';ctrl_ifextern<='0';ctrl_ifio<='0';ctrl_ifread<='0';
			regindex<=(others=>'0');
			alures<=(others=>'0');
		elsif cs='1' then
			ctrl_ifwrite<='0';ctrl_ifpc<='0';ctrl_ifextern<='0';ctrl_ifio<='0';ctrl_ifread<='0';
			case ir_temp(15 downto 11) is
				when "10000" =>  --sta
					ctrl_ifextern<='1';
					m_addr<=regarr(7) & ir_temp(7 downto 0);
					m_data<=regarr(conv_integer(ir_temp(10 downto 8)));
				when "10001"=>   --lda
					ctrl_ifextern<='1';
					ctrl_ifread<='1';
					ctrl_ifwrite<='1';
					m_addr<=regarr(7)&ir_temp(7 downto 0);
					--回写地址
					regindex<=ir_temp(10 downto 8);
				when "01000"=>  --jz
					if regarr(conv_integer(ir_temp(10 downto 8)))="00000000" then
						ctrl_ifwrite<='1';
						ctrl_ifpc<='1';
						alures<=regarr(7) & ir_temp(7 downto 0);
					else
						ctrl_ifwrite<='0';ctrl_ifpc<='0';ctrl_ifextern<='0';ctrl_ifio<='0';ctrl_ifread<='0';
					end if;
				when "01001"=>		--jmp
					ctrl_ifwrite<='1';ctrl_ifpc<='1';
					alures<=regarr(7) & ir_temp(7 downto 0);
				when "00101"=>			--in  ri  ; in只接受一个ri，地址来自于开关键，因此只有一个地址
					regindex<=ir_temp(10 downto 8);  --in is right
					ctrl_ifwrite<='1'; --回写内存存储器
					ctrl_ifextern<='1';
					ctrl_ifio<='1';
					ctrl_ifread<='1'; --读外部io
				when "00100"=>			--out   ；out也只接受一个地址，显示到数码管
					m_data<=regarr(conv_integer(ir_temp(10 downto 8)));  --out is right
					ctrl_ifextern<='1';
					ctrl_ifio<='1'; --写外部io，不回写
				when "00000" =>  --add
					ctrl_ifwrite<='1';
					alures(7 downto 0)<=regarr(conv_integer(ir_temp(10 downto 8)))+regarr(conv_integer(ir_temp(2 downto 0)));
					regindex<=ir_temp(10 downto 8);
				when "00001"=>		--sub
					ctrl_ifwrite<='1';
					alures(7 downto 0)<=regarr(conv_integer(ir_temp(10 downto 8)))-regarr(conv_integer(ir_temp(2 downto 0)));
					regindex<=ir_temp(10 downto 8);
				when "00010"=>   --mov
					ctrl_ifwrite<='1';
					alures(7 downto 0)<=regarr(conv_integer(ir_temp(2 downto 0)));
					regindex<=ir_temp(10 downto 8);
				when "00011"=>   --mvi
					ctrl_ifwrite<='1';
					alures(7 downto 0)<=ir_temp(7 downto 0);
					regindex<=ir_temp(10 downto 8);
				when others=>
					--其他指令，完全重置
					ctrl_ifextern<='0';
					ctrl_ifwrite<='1';
					ctrl_ifpc<='1';
					alures<=(others=>'0');
				end case;
		end if;
	end process;

end Behavioral;

